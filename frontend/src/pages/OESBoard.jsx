import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Users, Target, Heart } from 'lucide-react';

const OESBoard = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [amount, setAmount] = useState('');
    const [step, setStep] = useState('input'); // input -> qr -> form -> success
    const [formData, setFormData] = useState({ name: '', email: '', utr: '', isAnonymous: false });
    const [loading, setLoading] = useState(false);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetchStudents();
        fetchActivity();
        const interval = setInterval(() => {
            fetchStudents();
            fetchActivity();
        }, 60000); 
        return () => clearInterval(interval);
    }, []);

    const fetchActivity = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/oes/activity`);
            if (res.ok) {
                const data = await res.json();
                setActivities(data);
            }
        } catch (err) { console.error(err); }
    };

    const fetchStudents = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/oes/students`);
            const data = await res.json();
            setStudents(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSupportClick = (student) => {
        setSelectedStudent(student);
        setStep('input');
        setAmount('');
        setFormData({ name: '', email: '', utr: '', isAnonymous: false });
    };

    const handleGenerateQR = () => {
        if (!amount || amount < 10) return alert("Minimum donation is ₹10");
        setStep('qr');
    };

    const handleSubmitPledge = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/oes/donate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId: selectedStudent._id,
                    donorName: formData.name,
                    email: formData.email,
                    amount: Number(amount),
                    utr: formData.utr,
                    isAnonymous: formData.isAnonymous
                })
            });
            if (res.ok) {
                setStep('success');
            } else {
                alert("Submission failed. Check UTR uniqueness.");
            }
        } catch (err) {
            console.error(err);
            alert("Network Error");
        } finally {
            setLoading(false);
        }
    };

    // Helper for Progress Bar
    const getProgress = (collected, required) => Math.min((collected / required) * 100, 100);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-ngo-green/10 text-ngo-green px-4 py-2 rounded-full mb-4">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-bold tracking-wide uppercase">Live Board</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Ooruni Education Support (OES)</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Transparent, direct support for student education fees. Join the community in funding the future.
                    </p>
                </div>

                {/* Activity Feed */}
                {activities.length > 0 && (
                    <div className="max-w-2xl mx-auto mb-10 overflow-hidden h-6 relative bg-white/50 rounded-full flex items-center justify-center">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activities[0].donor + activities[0].time}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-xs font-semibold text-gray-500"
                            >
                                <span className="text-ngo-green font-bold">{activities[0].donor}</span> supported <span className="text-gray-800">{activities[0].student}</span> • <span className="opacity-70">Just now</span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {students.map((student) => (
                        <motion.div 
                            key={student._id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            whileHover={{ y: -2, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                            className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col transition-shadow duration-300"
                        >
                            <div className="h-56 bg-gray-200 relative overflow-hidden group">
                                <img 
                                    src={student.photo || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80"} 
                                    alt={student.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold tracking-wider shadow-sm">
                                    {student.oesId}
                                </div>
                                {student.status === 'Fully Supported' && (
                                    <div className="absolute inset-0 bg-green-900/80 flex items-center justify-center backdrop-blur-sm">
                                        <div className="text-center text-white">
                                            <CheckCircle size={48} className="mx-auto mb-2" />
                                            <span className="text-xl font-bold uppercase tracking-widest">Fully Funded</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                        {student.name}
                                        {student.verificationBadge !== false && (
                                            <span title="Verified Student" className="text-blue-500"><CheckCircle size={16} fill="currentColor" className="text-white" /></span>
                                        )}
                                    </h3>
                                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                                        </span>
                                        Live
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-ngo-green mb-4">{student.course}</p>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-sm font-semibold text-gray-600">
                                        <span>Raised: ₹{student.amountCollected.toLocaleString()}</span>
                                        <span>Goal: ₹{student.amountRequired.toLocaleString()}</span>
                                    </div>
                                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden relative">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${getProgress(student.amountCollected, student.amountRequired)}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-ngo-green to-emerald-400 rounded-full relative overflow-hidden"
                                        >
                                            {/* Subtle Shimmer */}
                                            <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                        </motion.div>
                                    </div>
                                    <div className="flex justify-end items-center gap-2">
                                        <span className="text-[10px] text-gray-400 font-medium tracking-wide flex items-center gap-1">
                                            <Users size={10} /> {Math.floor(Math.random() * 5) + 2} viewing
                                        </span>
                                    </div>
                                    {/* Impact Breakdown */}
                                    <div className="text-[10px] text-gray-500 bg-gray-50 p-2 rounded border border-gray-100/50">
                                        <span className="font-bold text-gray-700">Impact:</span> ₹1k = Books • ₹5k = Exam Fees
                                    </div>
                                </div>

                                {/* Supporters Bubbles */}
                                {student.supporters.length > 0 && (
                                    <div className="flex -space-x-2 overflow-hidden mb-6 py-2 min-h-[40px] items-center">
                                        <AnimatePresence>
                                            {student.supporters.slice(0, 5).map((supporter, i) => (
                                                <motion.div 
                                                    key={`${student._id}-sup-${i}`}
                                                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: i * 0.1 }}
                                                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600 uppercase shadow-sm relative z-10 hover:z-20 hover:scale-110 transition-transform" 
                                                    title={supporter}
                                                >
                                                    {supporter.charAt(0)}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                        {student.supporters.length > 5 && (
                                            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-500 relative z-0">
                                                +{student.supporters.length - 5}
                                            </div>
                                        )}
                                        <span className="text-xs text-gray-400 self-center ml-3">
                                            {student.supporters.length} supporters
                                        </span>
                                    </div>

                                )}

                                {/* Updates Log */}
                                {student.updates && student.updates.length > 0 && (
                                    <div className="mb-4 bg-yellow-50/50 p-2 rounded border border-yellow-100/50">
                                        <p className="text-[10px] font-bold text-yellow-800 uppercase mb-1">Latest Update</p>
                                        <p className="text-xs text-gray-700 leading-tight">
                                           "{student.updates[student.updates.length - 1].text}"
                                           <span className="opacity-50 ml-1">- {new Date(student.updates[student.updates.length - 1].date).toLocaleDateString()}</span>
                                        </p>
                                    </div>
                                )}

                                <div className="mt-auto">
                                    {student.status !== 'Fully Supported' ? (
                                        <motion.button 
                                            whileHover={{ scale: 1.01, backgroundColor: '#047857' }} // emerald-700
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleSupportClick(student)}
                                            className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
                                        >
                                            <Heart size={18} className="fill-current" /> Support This Student
                                        </motion.button>
                                    ) : (
                                        <button disabled className="w-full bg-gray-100 text-gray-400 font-bold py-3 rounded-xl cursor-not-allowed">
                                            Goal Reached 🎉
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* PAYMENT MODAL */}
            <AnimatePresence>
                {selectedStudent && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Support {selectedStudent.name}</h3>
                                    <p className="text-xs text-gray-500 font-mono">ID: {selectedStudent.oesId}</p>
                                </div>
                                <button onClick={() => setSelectedStudent(null)} className="text-gray-400 hover:text-gray-900 text-2xl">×</button>
                            </div>

                            <div className="p-6">
                                {/* STEP 1: INPUT AMOUNT */}
                                {step === 'input' && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Enter Amount (₹)</label>
                                            <input 
                                                type="number" 
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                placeholder="e.g. 500"
                                                className="w-full text-3xl font-bold p-4 border rounded-xl text-center focus:ring-2 focus:ring-ngo-green outline-none"
                                                autoFocus
                                            />
                                        </div>
                                        <button 
                                            onClick={handleGenerateQR}
                                            className="w-full bg-ngo-green text-white font-bold py-4 rounded-xl hover:bg-green-700 transition shadow-lg text-lg"
                                        >
                                            Generate Payment QR
                                        </button>
                                    </div>
                                )}

                                {/* STEP 2: QR & PAY */}
                                {step === 'qr' && (
                                    <div className="text-center space-y-6">
                                        <div className="bg-white p-4 border-2 border-dashed border-gray-300 rounded-xl inline-block mx-auto">
                                            <QRCode 
                                                value={`upi://pay?pa=eze0008933@cub&pn=Ooruni%20Foundation&am=${amount}&tn=OES%20${selectedStudent.oesId}&cu=INR`} 
                                                size={180} 
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-2xl text-gray-900 mb-1">₹{amount}</p>
                                            <p className="text-xs text-gray-500">Scan via GPay / PhonePe / Paytm</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 md:hidden">
                                             <a href={`tez://upi/pay?pa=eze0008933@cub&pn=Ooruni%20Foundation&am=${amount}&tn=OES%20${selectedStudent.oesId}&cu=INR`} className="bg-blue-600 text-white font-bold py-2 rounded-lg text-sm">GPay</a>
                                             <a href={`phonepe://pay?pa=eze0008933@cub&pn=Ooruni%20Foundation&am=${amount}&tn=OES%20${selectedStudent.oesId}&cu=INR`} className="bg-purple-600 text-white font-bold py-2 rounded-lg text-sm">PhonePe</a>
                                        </div>

                                        <button 
                                            onClick={() => setStep('form')}
                                            className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition flex items-center justify-center gap-2"
                                        >
                                            <span>✅</span> I have completed payment
                                        </button>
                                    </div>
                                )}

                                {/* STEP 3: FORM */}
                                {step === 'form' && (
                                    <form onSubmit={handleSubmitPledge} className="space-y-4">
                                        <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700 mb-4">
                                            Please provide details for the receipt. Verification takes 24-48 hours.
                                        </div>
                                        <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-ngo-green outline-none" />
                                        <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-ngo-green outline-none" />
                                        <input required placeholder="UTR / Transaction ID" value={formData.utr} onChange={e => setFormData({ ...formData, utr: e.target.value })} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-ngo-green outline-none font-mono" />
                                        
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                id="anon"
                                                checked={formData.isAnonymous}
                                                onChange={e => setFormData({...formData, isAnonymous: e.target.checked})}
                                                className="w-4 h-4 text-ngo-green rounded focus:ring-ngo-green"    
                                            />
                                            <label htmlFor="anon" className="text-sm text-gray-700">Donate Anonymously (Hide my name)</label>
                                        </div>
                                        
                                        <button disabled={loading} type="submit" className="w-full bg-ngo-green text-white font-bold py-3 rounded-xl hover:bg-green-700 transition shadow-lg mt-2 disabled:opacity-50">
                                            {loading ? 'Submitting...' : 'Submit Verification Request'}
                                        </button>
                                    </form>
                                )}

                                {/* STEP 4: SUCCESS */}
                                {step === 'success' && (
                                    <div className="text-center py-8">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl animate-bounce">🎉</div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                                        <p className="text-gray-600 text-sm mb-6">
                                            Your pledge for <b>{selectedStudent.name}</b> has been received. <br/>
                                            Once verified, your contribution will be added to the live board.
                                            <br/><br/>
                                            <span className="text-xs font-serif italic text-gray-500">"Education is the most powerful weapon which you can use to change the world."</span>
                                        </p>
                                        <button onClick={() => setSelectedStudent(null)} className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold">Close</button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OESBoard;
