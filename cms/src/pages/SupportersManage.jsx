import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Upload, Trash2, Plus, ExternalLink, Building2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SupportersManage = () => {
    const [supporters, setSupporters] = useState([]);
    const [newSupporter, setNewSupporter] = useState({ name: '', logo: '', website: '' });
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSupporters();
    }, []);

    const fetchSupporters = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/supporters`);
            const data = await res.json();
            setSupporters(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        setIsUploading(true);

        try {
            const res = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            // Ensure we handle both string response or object response formats if they vary
            const imageUrl = typeof data === 'string' ? data : data.imageUrl;
            setNewSupporter({ ...newSupporter, logo: imageUrl });
        } catch (err) {
            console.error("Upload failed", err);
            alert("Image upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newSupporter.name || !newSupporter.logo) {
            alert("Name and Logo are required!");
            return;
        }

        try {
            await fetch(`${API_URL}/api/supporters`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSupporter)
            });
            setNewSupporter({ name: '', logo: '', website: '' });
            fetchSupporters();
        } catch (err) {
            console.error(err);
            alert("Failed to add supporter");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this supporter?")) return;
        try {
            await fetch(`${API_URL}/api/supporters/${id}`, { method: 'DELETE' });
            fetchSupporters();
        } catch (err) {
            console.error(err);
            alert("Failed to delete");
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                    <Building2 /> Manage Supporters
                </h1>

                {/* ADD NEW SUPPORTER CARD */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <Plus size={20} /> Add New Partner
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Company Name</label>
                            <input 
                                type="text"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={newSupporter.name}
                                onChange={e => setNewSupporter({...newSupporter, name: e.target.value})}
                                placeholder="e.g. Google"
                                required
                            />
                        </div>
                        <div className="md:col-span-1">
                             <label className="block text-sm font-medium text-gray-600 mb-1">Website (Optional)</label>
                             <input 
                                type="url"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={newSupporter.website}
                                onChange={e => setNewSupporter({...newSupporter, website: e.target.value})}
                                placeholder="https://..."
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Logo</label>
                             {newSupporter.logo ? (
                                <div className="flex items-center gap-2 p-2 border rounded-lg bg-green-50 text-green-700">
                                    <span className="text-xs truncate">{newSupporter.logo.split('/').pop()}</span>
                                    <button type="button" onClick={() => setNewSupporter({...newSupporter, logo: ''})} className="text-red-500 hover:text-red-700"><Trash2 size={16}/></button>
                                </div>
                             ) : (
                                <div className="relative border border-dashed border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition text-center cursor-pointer">
                                    <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                    <span className="text-sm text-gray-500 flex items-center justify-center gap-1">
                                        {isUploading ? "Uploading..." : <><Upload size={16}/> Upload Logo</>}
                                    </span>
                                </div>
                             )}
                        </div>
                        <button 
                            type="submit" 
                            disabled={isUploading}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            Add Partner
                        </button>
                    </form>
                </div>

                {/* LIST OF SUPPORTERS */}
                {isLoading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {supporters.map(supporter => (
                            <div key={supporter._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 flex items-center justify-center border border-gray-100">
                                        <img src={supporter.logo} alt={supporter.name} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{supporter.name}</h3>
                                        {supporter.website && (
                                            <a href={supporter.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 flex items-center gap-1 hover:underline">
                                                Visit Website <ExternalLink size={10} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDelete(supporter._id)}
                                    className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                        {supporters.length === 0 && (
                            <div className="col-span-full text-center py-12 text-gray-400">
                                No supporters added yet.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupportersManage;
