import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { Download, Share2, Camera, CheckCircle, Loader } from 'lucide-react';
import { API_URL } from '../api';

const Volunteer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        skills: ''
    });
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [badgeData, setBadgeData] = useState(null);
    const badgeRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('skills', formData.skills);
        if (photo) data.append('photo', photo);

        try {
            const res = await axios.post(`${API_URL}/volunteer/register`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setBadgeData(res.data);
        } catch (err) {
            console.error(err);
            alert("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

        const downloadBadge = async () => {
        if (badgeRef.current) {
            const canvas = await html2canvas(badgeRef.current);
            const link = document.createElement('a');
            link.download = `Ooruni_Volunteer_${badgeData.name}.jpg`;
            link.href = canvas.toDataURL('image/jpeg', 0.9); // Quality 0.9
            link.click();
        }
    };

    const shareWhatsapp = async () => {
        if (badgeRef.current) {
            try {
                const canvas = await html2canvas(badgeRef.current);
                canvas.toBlob(async (blob) => {
                    const file = new File([blob], `Ooruni_Volunteer_${badgeData.name}.jpg`, { type: 'image/jpeg' });
                    
                    const shareData = {
                        title: 'My Ooruni Volunteer Badge',
                        text: 'I just joined Ooruni Foundation as a Volunteer! Check out my badge.',
                        files: [file]
                    };

                    // Try Native Sharing (Works on Mobile)
                    if (navigator.canShare && navigator.canShare({ files: [file] })) {
                        await navigator.share(shareData);
                    } else {
                        // Fallback for Desktop: Download + Open WhatsApp Web
                        const link = document.createElement('a');
                        link.download = `Ooruni_Volunteer_${badgeData.name}.jpg`;
                        link.href = canvas.toDataURL('image/jpeg', 0.9);
                        link.click();

                        alert("Badge downloaded (JPG)! Please attach it to your WhatsApp message.");
                        
                        const text = `I just joined Ooruni Foundation as a Volunteer! Check out my badge.`;
                        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                    }
                }, 'image/jpeg');
            } catch (err) {
                console.error("Error sharing:", err);
            }
        }
    };

    const shareLinkedin = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://oorunifoundation.org`, '_blank');
    };

    if (badgeData) {
        return (
            <div className="min-h-screen bg-ngo-cream flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-8 text-center space-y-6">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div ref={badgeRef} className="bg-gradient-to-br from-blue-900 to-gray-900 text-white p-6 rounded-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                            </div>
                            
                            <h2 className="text-2xl font-bold font-display tracking-wider mb-1">VOLUNTEER</h2>
                            <p className="text-xs text-gray-300 uppercase tracking-widest mb-6">Ooruni Foundation</p>
                            
                            <div className="flex flex-col items-center space-y-4">
                                <div className="h-32 w-32 rounded-full border-4 border-white/20 overflow-hidden bg-gray-800">
                                    {badgeData.photo ? (
                                        <img src={`${API_URL}${badgeData.photo}`} alt="Volunteer" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-gray-400">No Photo</div>
                                    )}
                                </div>
                                
                                <div>
                                    <h3 className="text-xl font-bold">{badgeData.name}</h3>
                                    <p className="text-sm text-blue-200">{badgeData.email}</p>
                                </div>

                                <div className="bg-white p-3 rounded-lg shadow-inner">
                                    <QRCode value={badgeData.encryptedData} size={120} />
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-between items-center text-xs text-gray-400">
                                <span>ID: {badgeData._id.slice(-6).toUpperCase()}</span>
                                <span>VERIFIED</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={downloadBadge} className="flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition">
                            <Download size={18} /> Download
                        </button>
                        <button onClick={shareWhatsapp} className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
                            <Share2 size={18} /> WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ngo-cream pt-32 pb-20 px-4">
            <div className="max-w-xl mx-auto">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold font-display text-gray-900 mb-2">Join the Movement</h1>
                        <p className="text-gray-600">Become an Ooruni Volunteer today.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center mb-6">
                            <label className="cursor-pointer group relative">
                                <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 group-hover:border-blue-500 overflow-hidden transition-colors">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <Camera className="text-gray-400 group-hover:text-blue-500" size={32} />
                                    )}
                                </div>
                                <input type="file" name="photo" onChange={handlePhotoChange} className="hidden" accept="image/*" required />
                                <span className="text-xs text-gray-500 mt-2 block text-center">Upload Photo</span>
                            </label>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                                    placeholder="John Doe"
                                    required 
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                                        placeholder="john@example.com"
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input 
                                        type="tel" 
                                        name="phone" 
                                        value={formData.phone} 
                                        onChange={handleChange} 
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                                        placeholder="+91 98765 43210"
                                        required 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Skills / Interests</label>
                                <textarea 
                                    name="skills" 
                                    value={formData.skills} 
                                    onChange={handleChange} 
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                                    placeholder="Teaching, Photography, Event Management..."
                                ></textarea>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader className="animate-spin" /> : "Register as Volunteer"}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Volunteer;
