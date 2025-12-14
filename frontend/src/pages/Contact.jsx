import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { API_URL } from '../api';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const { register, handleSubmit, reset } = useForm();
    const [status, setStatus] = useState(null);
    const [activeTab, setActiveTab] = useState('message');

    const onSubmit = async (data) => {
        try {
            await axios.post(`${API_URL}/contact`, data);
            setStatus('success');
            reset();
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div className="pt-20 pb-20 container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-ngo-dark mb-4">Get in Touch</h1>
                <p className="text-xl text-gray-600">We'd love to hear from you. Volunteer, donate, or just say hi.</p>
            </div>

            {/* Mobile Tab Navigation */}
            <div className="md:hidden flex p-1 bg-gray-100 rounded-xl mb-8">
                <button 
                    onClick={() => setActiveTab('message')}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 ${activeTab === 'message' ? 'bg-white text-ngo-dark shadow-sm' : 'text-gray-500'}`}
                >
                    <Send size={16} /> Send Message
                </button>
                <button 
                    onClick={() => setActiveTab('info')}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 ${activeTab === 'info' ? 'bg-white text-ngo-green shadow-sm' : 'text-gray-500'}`}
                >
                    <MapPin size={16} /> Contact Info
                </button>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative`}>
                {/* Contact Info (Mobile: Show only if activeTab is info. Desktop: Always Show) */}
                <div className={`space-y-8 order-2 md:order-1 ${activeTab === 'info' ? 'block' : 'hidden md:block'}`}>
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-sans">Contact Information</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-ngo-green mt-1 shrink-0" size={24} />
                                <div>
                                    <h3 className="font-bold text-gray-900">Regd. Office</h3>
                                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                                        No 18A, First Floor, Patel Cross Street,<br/>
                                        Nehru Nagar, Chrompet, Chennai, 600044.
                                    </p>

                                    <h3 className="font-bold text-gray-900">Correspondence Office</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Level 2, Setraa Towers, No. 304, GST Road,<br/>
                                        Chrompet, Chennai, 600044.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="text-ngo-green shrink-0" size={24} />
                                <div>
                                    <h3 className="font-bold text-gray-900">Phone</h3>
                                    <p className="text-gray-600">+91 95516 48732</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="text-ngo-green shrink-0" size={24} />
                                <div>
                                    <h3 className="font-bold text-gray-900">Email</h3>
                                    <p className="text-gray-600 break-all">oorunifoundation@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Embed (Placeholder) */}
                        <div className="mt-8 h-48 md:h-64 bg-gray-200 rounded-xl overflow-hidden shadow-inner">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15545.897589578278!2d80.20901!3d13.04505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzQyLjIiTiA4MMKwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1631234567890!5m2!1sen!2sin" 
                                width="100%" 
                                height="100%" 
                                style={{border:0}} 
                                allowFullScreen="" 
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Contact Form (Mobile: Show only if activeTab is message. Desktop: Always Show) */}
                <div className={`bg-white p-6 md:p-8 rounded-2xl shadow-lg h-fit border border-gray-100 order-1 md:order-2 ${activeTab === 'message' ? 'block' : 'hidden md:block'}`}>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                    {status === 'success' && <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">Message sent successfully!</div>}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input 
                                {...register("name", { required: true })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ngo-green outline-none transition"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input 
                                type="email"
                                inputMode="email"
                                {...register("email", { required: true })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ngo-green outline-none transition"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea 
                                {...register("message", { required: true })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ngo-green outline-none h-32 transition resize-none"
                                placeholder="How can we help?"
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-ngo-dark text-white font-bold py-4 rounded-xl hover:bg-black transition flex items-center justify-center gap-2 text-lg">
                            <Send size={20} /> Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
