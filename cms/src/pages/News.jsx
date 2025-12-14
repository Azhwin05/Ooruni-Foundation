import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../api';

import { AuthContext } from '../context/AuthContext';
import { Trash2, Edit, Plus } from 'lucide-react';

const News = () => {
    const [news, setNews] = useState([]);
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: '', tamilTitle: '', description: '', link: '' });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await axios.get(`${API_URL}/news`);
            setNews(res.data);
        } catch (err) {
            console.error("Error fetching news:", err);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure?")) {
            try {
                await axios.delete(`${API_URL}/news/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                fetchNews();
            } catch (err) {
                console.error("Error deleting news:", err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/news`, formData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setShowModal(false);
            setFormData({ title: '', tamilTitle: '', description: '', link: '' });
            fetchNews();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Manage News</h1>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-admin-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-admin-secondary transition"
                >
                    <Plus size={20} /> Add News
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {news.map((item) => (
                    <div key={item._id} className="bg-white p-6 rounded-lg shadow flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                            {item.tamilTitle && <h4 className="text-lg text-gray-600 font-sans">{item.tamilTitle}</h4>}
                            <p className="text-gray-500 mt-2">{item.description}</p>
                        </div>
                        <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700 p-2">
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-6">Add News</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input 
                                className="w-full border p-2 rounded" 
                                placeholder="Title" 
                                value={formData.title} 
                                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                                required 
                            />
                            <input 
                                className="w-full border p-2 rounded" 
                                placeholder="Tamil Title (Optional)" 
                                value={formData.tamilTitle} 
                                onChange={(e) => setFormData({...formData, tamilTitle: e.target.value})} 
                            />
                            <textarea 
                                className="w-full border p-2 rounded" 
                                placeholder="Description" 
                                value={formData.description} 
                                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                                required 
                            ></textarea>
                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">Cancel</button>
                                <button type="submit" className="bg-admin-primary text-white px-4 py-2 rounded">Publish</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default News;
