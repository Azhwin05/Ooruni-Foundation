import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../api';
import { Loader, Search, CheckCircle, Clock } from 'lucide-react';

const Volunteers = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const res = await axios.get(`${API_URL}/volunteer/list`);
                setVolunteers(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchVolunteers();
    }, []);

    const filteredVolunteers = volunteers.filter(v => 
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-10 flex justify-center"><Loader className="animate-spin text-blue-600" /></div>;

    return (
        <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    Volunteers
                </h1>
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search volunteers..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-x-auto border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600">Volunteer</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Contact</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Skills</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredVolunteers.length > 0 ? (
                            filteredVolunteers.map(volunteer => (
                                <tr key={volunteer._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                                {volunteer.photo ? (
                                                    <img src={`${API_URL}${volunteer.photo}`} alt="" className="h-full w-full object-cover" />
                                                ) : <div className="h-full w-full flex items-center justify-center text-xs text-gray-500">Img</div>}
                                            </div>
                                            <span className="font-medium text-gray-900">{volunteer.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-gray-900">{volunteer.email}</span>
                                            <span className="text-sm text-gray-500">{volunteer.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={volunteer.skills}>
                                        {volunteer.skills || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {volunteer.status === 'Verified' ? (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                <CheckCircle size={14} /> Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                                <Clock size={14} /> Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">
                                        {new Date(volunteer.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-gray-500">No volunteers found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Volunteers;
