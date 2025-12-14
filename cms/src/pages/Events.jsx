import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../api';

import { AuthContext } from '../context/AuthContext';
import { Trash2, Plus } from 'lucide-react';
import { format } from 'date-fns';

const Events = () => {
    const [events, setEvents] = useState([]);
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', date: '', location: '', registrationLink: '' });
    const [editingId, setEditingId] = useState(null); // Added for editing functionality

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get(`${API_URL}/events`);
            setEvents(res.data);
        } catch (err) {
            console.error("Error fetching events:", err);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure?")) {
            try {
                await axios.delete(`${API_URL}/events/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                fetchEvents();
            } catch (err) {
                console.error("Error deleting event:", err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Submit to API
        try {
            if (editingId) {
                await axios.put(`${API_URL}/events/${editingId}`, formData, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
            } else {
                await axios.post(`${API_URL}/events`, formData, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
            }
            setShowModal(false);
            setFormData({ title: '', description: '', date: '', location: '', registrationLink: '' });
            setEditingId(null); // Reset editing state
            fetchEvents();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Manage Events</h1>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-admin-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-admin-secondary transition"
                >
                    <Plus size={20} /> Add Event
                </button>
            </div>

            <div className="space-y-4">
                {events.map((event) => (
                    <div key={event._id} className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                            <p className="text-sm text-gray-500">{format(new Date(event.date), 'PPP')} • {event.location}</p>
                        </div>
                        <button onClick={() => handleDelete(event._id)} className="text-red-500 hover:text-red-700 p-2">
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-6">Add Event</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input className="w-full border p-2 rounded" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                            <input type="date" className="w-full border p-2 rounded" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
                            <input className="w-full border p-2 rounded" placeholder="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                            <textarea className="w-full border p-2 rounded" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required ></textarea>
                            <input className="w-full border p-2 rounded" placeholder="Registration Link" value={formData.registrationLink} onChange={(e) => setFormData({...formData, registrationLink: e.target.value})} />
                            
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

export default Events;
