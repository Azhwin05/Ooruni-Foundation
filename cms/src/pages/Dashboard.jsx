import React, { useEffect, useState, useContext } from 'react';

import axios from 'axios';
import { API_URL } from '../api';
import { AuthContext } from '../context/AuthContext';
import { FileText, Calendar, Image, GraduationCap, Users } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        newsCount: 0,
        eventCount: 0,
        galleryCount: 0,
        scholarshipCount: 0,
        volunteerCount: 0,
        recentActivity: []
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${API_URL}/dashboard/stats`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };
        fetchStats();
    }, [user.token]);

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase">Total News</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.newsCount}</p>
                        </div>
                        <FileText className="text-blue-200" size={32} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase">Events</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.eventCount}</p>
                        </div>
                        <Calendar className="text-green-200" size={32} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
                        <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase">Gallery Images</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.galleryCount}</p>
                        </div>
                        <Image className="text-purple-200" size={32} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase">Pending Scholarships</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.scholarshipCount}</p>
                        </div>
                        <GraduationCap className="text-yellow-200" size={32} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-teal-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase">Volunteers</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.volunteerCount}</p>
                        </div>
                        <Users className="text-teal-200" size={32} />
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Scholarship Applications</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {stats.recentActivity.length > 0 ? (
                                stats.recentActivity.map((item) => (
                                    <tr key={item._id}>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                item.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                item.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No recent applications found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
