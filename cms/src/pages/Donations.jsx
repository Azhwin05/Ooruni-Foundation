import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { CheckCircle, Clock, Search, ExternalLink } from 'lucide-react';

const Donations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(null);

    const fetchDonations = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/donations`);
            const data = await res.json();
            setDonations(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    const handleVerify = async (id) => {
        if (!window.confirm("Are you sure you want to verify this donation? An official receipt will be sent to the donor.")) return;
        
        setVerifying(id);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/donations/${id}/verify`, {
                method: 'POST',
            });
            if (res.ok) {
                alert("Donation Verified & Receipt Sent!");
                fetchDonations(); // Refresh list
            } else {
                alert("Verification failed.");
            }
        } catch (err) {
            console.error(err);
            alert("Error connecting to server.");
        } finally {
            setVerifying(null);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Donations & Receipts</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                <th className="p-4">Date</th>
                                <th className="p-4">Donor Name</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">UTR / Ref</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan="6" className="p-8 text-center text-gray-500">Loading donations...</td></tr>
                            ) : donations.length === 0 ? (
                                <tr><td colSpan="6" className="p-8 text-center text-gray-500">No donations found yet.</td></tr>
                            ) : (
                                donations.map((donation) => (
                                    <tr key={donation._id} className="hover:bg-gray-50 transition">
                                        <td className="p-4 text-sm text-gray-600">
                                            {new Date(donation.date).toLocaleDateString()}
                                            <br/>
                                            <span className="text-xs text-gray-400">{new Date(donation.date).toLocaleTimeString()}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-semibold text-gray-800">{donation.name}</div>
                                            <div className="text-xs text-gray-500">{donation.email}</div>
                                            {donation.phone && <div className="text-xs text-gray-500">{donation.phone}</div>}
                                        </td>
                                        <td className="p-4 font-bold text-ngo-green">₹{donation.amount}</td>
                                        <td className="p-4 text-sm font-mono text-gray-600">{donation.utr}</td>
                                        <td className="p-4">
                                            {donation.status === 'Verified' ? (
                                                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                                    <CheckCircle size={14} /> Verified
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                                                    <Clock size={14} /> Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {donation.status !== 'Verified' && (
                                                <button 
                                                    onClick={() => handleVerify(donation._id)}
                                                    disabled={verifying === donation._id}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition disabled:opacity-50"
                                                >
                                                    {verifying === donation._id ? 'Sending...' : 'Verify & Send Receipt'}
                                                </button>
                                            )}
                                            {donation.status === 'Verified' && (
                                                 <span className="text-xs text-gray-400">Receipt Sent</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Donations;
