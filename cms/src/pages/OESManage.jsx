import React, { useState, useEffect } from 'react';
import { Upload, Plus, CheckCircle, Clock, X, Search, FileText, IndianRupee } from 'lucide-react';

const OESManage = () => {
    const [activeTab, setActiveTab] = useState('students'); // 'students' or 'verifications'
    const [students, setStudents] = useState([]);
    const [donations, setDonations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    // New Student Form
    const [newStudent, setNewStudent] = useState({ name: '', oesId: '', photo: '', course: '', amountRequired: '' });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        if (activeTab === 'students') fetchStudents();
        else fetchDonations();
    }, [activeTab]);

    const fetchStudents = async () => {
        try {
            const res = await fetch(`${API_URL}/api/oes/students`);
            const data = await res.json();
            setStudents(data);
        } catch (err) { console.error(err); }
    };

    const fetchDonations = async () => {
        try {
            const res = await fetch(`${API_URL}/api/oes/donations`);
            const data = await res.json();
            setDonations(data);
        } catch (err) { console.error(err); }
    };

    const handleCreateStudent = async (e) => {
        e.preventDefault();
        if (!confirm("Publish new OES Student Case?")) return;

        try {
            const res = await fetch(`${API_URL}/api/oes/student`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStudent),
            });
            if (res.ok) {
                alert("Student Added Successfully!");
                setNewStudent({ name: '', oesId: '', photo: '', course: '', amountRequired: '' });
                setShowModal(false);
                fetchStudents();
            } else {
                alert("Failed. Check if OES ID is unique.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleVerifyDonation = async (id) => {
        if (!confirm("Verify this donation? This adds funds to the student and emails the receipt.")) return;
        
        try {
            const res = await fetch(`${API_URL}/api/oes/verify/${id}`, {
                method: 'PUT'
            });
            if (res.ok) {
                alert("Verified & Funds Added!");
                fetchDonations();
            } else {
                alert("Verification Failed");
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Helper for Image Upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file); // Changed from 'image' to 'file' to match backend
    
        try {
            const res = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json(); // data is the URL string
            setNewStudent({ ...newStudent, photo: data }); // Changed from data.imageUrl
        } catch (err) {
            console.error(err);
            alert("Image upload failed");
        }
    };

    // Post Update
    const [updateText, setUpdateText] = useState('');
    const [updatingId, setUpdatingId] = useState(null);

    const handlePostUpdate = async (id) => {
        if (!updateText) return alert("Enter update text");
        if (!confirm("Post this update visible to public?")) return;

        try {
            const res = await fetch(`${API_URL}/api/oes/student/${id}/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: updateText }),
            });
            if (res.ok) {
                setUpdateText('');
                setUpdatingId(null);
                fetchStudents();
            } else {
                alert("Failed to post update.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Image Helper
    const getImageUrl = (path) => {
        if (!path) return 'https://via.placeholder.com/100';
        if (path.startsWith('http')) return path;
        return `${API_URL}${path}`;
    };

    return (
        <div className="space-y-8 font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">OES Board Manager</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage students, track funding, and verify donations.</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button 
                            onClick={() => setActiveTab('students')}
                            className={`px-6 py-2 rounded-md text-sm font-bold transition-all shadow-sm ${activeTab === 'students' ? 'bg-white text-emerald-600' : 'text-gray-500 hover:text-gray-900 bg-transparent shadow-none'}`}
                        >
                            Students
                        </button>
                        <button 
                            onClick={() => setActiveTab('verifications')}
                            className={`px-6 py-2 rounded-md text-sm font-bold transition-all shadow-sm ${activeTab === 'verifications' ? 'bg-white text-emerald-600' : 'text-gray-500 hover:text-gray-900 bg-transparent shadow-none'}`}
                        >
                            Verifications
                        </button>
                    </div>
                    {activeTab === 'students' && (
                        <button 
                            onClick={() => setShowModal(true)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition shadow-lg shadow-emerald-200"
                        >
                            <Plus size={18} /> New Student
                        </button>
                    )}
                </div>
            </div>

            {/* TAB 1: STUDENTS GRID */}
            {activeTab === 'students' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {students.map(student => (
                        <div key={student._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                            {/* Card Header */}
                            <div className="p-4 flex gap-4 items-start border-b border-gray-50">
                                <img src={getImageUrl(student.photo)} className="w-16 h-16 object-cover rounded-xl bg-gray-100" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate" title={student.name}>{student.name}</h4>
                                    <span className="text-xs font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">{student.oesId}</span>
                                    <p className="text-xs text-emerald-600 font-medium mt-1 truncate">{student.course}</p>
                                </div>
                            </div>
                            
                            {/* Stats */}
                            <div className="p-4 space-y-3">
                                <div className="flex justify-between items-end text-xs">
                                    <span className="text-gray-500 font-medium">Funded</span>
                                    <span className="font-bold text-gray-900">{Math.round((student.amountCollected/student.amountRequired)*100)}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style={{ width: `${Math.min((student.amountCollected/student.amountRequired)*100, 100)}%` }}></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>₹{student.amountCollected.toLocaleString()}</span>
                                    <span>Goal: ₹{student.amountRequired.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Updates Timeline */}
                            <div className="flex-1 bg-gray-50/50 p-4 border-t border-gray-100 flex flex-col">
                                <div className="flex justify-between items-center mb-3">
                                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                        <Clock size={10} /> Latest Updates
                                    </h5>
                                    <button 
                                        onClick={() => setUpdatingId(updatingId === student._id ? null : student._id)} 
                                        className="text-xs text-blue-600 font-semibold hover:bg-blue-50 px-2 py-1 rounded transition"
                                    >
                                        {updatingId === student._id ? 'Cancel' : '+ Add'}
                                    </button>
                                </div>

                                {updatingId === student._id && (
                                    <div className="mb-3 animate-in slide-in-from-top-2 fade-in duration-200">
                                        <div className="flex gap-2">
                                            <input 
                                                autoFocus
                                                placeholder="e.g. Fees Paid" 
                                                value={updateText} 
                                                onChange={e => setUpdateText(e.target.value)} 
                                                className="flex-1 text-xs border border-blue-200 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100"
                                            />
                                            <button onClick={() => handlePostUpdate(student._id)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-lg font-bold transition">
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3 max-h-32 overflow-y-auto pr-1 scrollbar-thin">
                                    {student.updates && student.updates.slice().reverse().map((u, i) => (
                                        <div key={i} className="relative pl-4 border-l border-gray-200">
                                            <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-gray-300 ring-2 ring-white"></div>
                                            <p className="text-xs text-gray-700 font-medium leading-tight">{u.text}</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{new Date(u.date).toLocaleDateString()}</p>
                                        </div>
                                    ))}
                                    {(!student.updates || student.updates.length === 0) && (
                                        <div className="text-center py-4">
                                            <p className="text-xs text-gray-400 italic">No updates recorded yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB 2: VERIFICATIONS */}
            {activeTab === 'verifications' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Donor Details</th>
                                    <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Beneficiary</th>
                                    <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Transaction Info</th>
                                    <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                    {donations.length === 0 ? (
                                    <tr><td colSpan="6" className="p-10 text-center text-gray-400 italic">All caught up! No pending verifications.</td></tr>
                                ) : donations.map(d => (
                                    <tr key={d._id} className="hover:bg-gray-50/80 transition-colors group">
                                        <td className="p-5 text-sm text-gray-600 whitespace-nowrap">
                                            <span className="flex items-center gap-2"><Clock size={14} className="text-gray-400"/> {new Date(d.date).toLocaleDateString()}</span>
                                        </td>
                                        <td className="p-5">
                                            <p className="font-bold text-gray-900">{d.donorName}</p>
                                            <p className="text-xs text-gray-500">{d.email}</p>
                                            {d.isAnonymous && <span className="inline-block mt-1 text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold">ANONYMOUS</span>}
                                        </td>
                                        <td className="p-5">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                                                {d.studentId?.name || 'Unknown'}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <span className="font-mono font-bold text-emerald-600 text-base">₹{Number(d.amount).toLocaleString()}</span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-400 uppercase font-bold">UTR / Ref</span>
                                                <span className="font-mono text-sm text-gray-700">{d.utr}</span>
                                            </div>
                                        </td>
                                        <td className="p-5 text-right">
                                            <button 
                                                onClick={() => handleVerifyDonation(d._id)} 
                                                className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition hover:scale-105 active:scale-95 flex items-center gap-2 ml-auto"
                                            >
                                                <CheckCircle size={16} /> Verify
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* MODAL: ADD STUDENT */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-900">Add New Student Case</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-900 transition bg-white rounded-full p-1 hover:bg-gray-200">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleCreateStudent} className="p-6 space-y-5">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                                    <input required placeholder="e.g. Priya Sharma" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">OES ID</label>
                                        <input required placeholder="e.g. OES-24-001" value={newStudent.oesId} onChange={e => setNewStudent({...newStudent, oesId: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Amount Required (₹)</label>
                                        <div className="relative">
                                            <IndianRupee size={16} className="absolute left-3 top-3 text-gray-400" />
                                            <input required type="number" placeholder="50000" value={newStudent.amountRequired} onChange={e => setNewStudent({...newStudent, amountRequired: e.target.value})} className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Course / Year</label>
                                    <input required placeholder="e.g. B.Tech Computer Science, 2nd Year" value={newStudent.course} onChange={e => setNewStudent({...newStudent, course: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Student Photo</label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 transition cursor-pointer relative">
                                        <input type="file" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                        {newStudent.photo ? (
                                            <div className="relative inline-block">
                                                <img src={getImageUrl(newStudent.photo)} alt="Preview" className="h-24 w-24 object-cover rounded-lg shadow-sm" />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold rounded-lg opacity-0 hover:opacity-100 transition">Change</div>
                                            </div>
                                        ) : (
                                            <div className="text-gray-500">
                                                <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                                                <span className="text-sm">Click to upload photo</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 flex items-center justify-center gap-2">
                                    <CheckCircle size={20} /> Publish Case
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OESManage;
