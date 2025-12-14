import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../api';

import { AuthContext } from '../context/AuthContext';
import { Download } from 'lucide-react';

const Scholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const res = await axios.get(`${API_URL}/scholarship`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setScholarships(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchScholarships();
    }, [user.token]);

    const handleStatusChange = async (id, status) => {
        try {
            await axios.put(`${API_URL}/scholarship/${id}`, { status }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            // Update local state
            setScholarships(scholarships.map(s => s._id === id ? { ...s, status } : s));
        } catch (err) {
           console.error(err);
        }
    };

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Scholarship Applications</h1>
                <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
                    <Download size={20} /> Export CSV
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Education</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Income</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {scholarships.map((s) => (
                            <tr key={s._id}>
                                <td className="px-6 py-4">{s.name}</td>
                                <td className="px-6 py-4">{s.educationLevel}</td>
                                <td className="px-6 py-4">₹{s.familyIncome}</td>
                                <td className="px-6 py-4 text-sm">
                                    {s.phone}<br/>{s.email}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                        s.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                        s.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {s.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <select 
                                        value={s.status} 
                                        onChange={(e) => handleStatusChange(s._id, e.target.value)}
                                        className="border rounded text-sm p-1"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Reviewed">Reviewed</option>
                                        <option value="Approved">Approve</option>
                                        <option value="Rejected">Reject</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Scholarships;
