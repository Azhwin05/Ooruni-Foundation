import React, { useState } from 'react';
import { CreditCard, Landmark, Heart } from 'lucide-react';
import QRCode from "react-qr-code";

const Donate = () => {
    const [amount, setAmount] = useState('');
    const [showQR, setShowQR] = useState(false);
    const [upiString, setUpiString] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', utr: '' });
    const [activeTab, setActiveTab] = useState('upi');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/donations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, amount, purpose: 'General' }),
            });
            if (response.ok) {
                setSubmitted(true);
            } else {
                alert("Submission failed. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting donation:", error);
            alert("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = () => {
        if (!amount || amount < 1) return;
        // Fixed details as per constraints
        const upi = `upi://pay?pa=eze0008933@cub&pn=Ooruni%20Foundation&am=${amount}&cu=INR&tn=Donation`;
        setUpiString(upi);
        setShowQR(true);
    };
    return (
        <div className="pt-4 md:pt-20 pb-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <Heart size={48} className="text-red-500 mx-auto mb-4" fill="#ef4444" />
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Our Cause</h1>
                    <p className="text-xl text-gray-600">Your contribution brings light to someone's life.</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 inline-flex">
                        <button 
                            onClick={() => setActiveTab('upi')}
                            className={`px-6 py-2 rounded-lg font-bold text-sm transition ${activeTab === 'upi' ? 'bg-ngo-green text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            UPI / QR
                        </button>
                        <button 
                            onClick={() => setActiveTab('bank')}
                            className={`px-6 py-2 rounded-lg font-bold text-sm transition ${activeTab === 'bank' ? 'bg-ngo-green text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Bank Transfer
                        </button>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* UPI / QR Section */}
                    {activeTab === 'upi' && (
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center text-center animate-fade-in">
                            <div className="flex items-center gap-3 mb-6">
                                <CreditCard className="text-blue-600" size={28} />
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Donate via UPI</h2>
                            </div>

                            {!showQR ? (
                                <div className="w-full max-w-sm space-y-6">
                                    <div>
                                        <label className="block text-left text-gray-700 font-semibold mb-2">Enter Donation Amount (₹)</label>
                                        <input 
                                            type="number" 
                                            min="1"
                                            inputMode="numeric"
                                            placeholder="e.g. 500"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ngo-green focus:border-transparent outline-none transition text-lg"
                                            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                        />
                                    </div>
                                    <button 
                                        onClick={handleGenerate}
                                        disabled={!amount || amount < 1}
                                        className="w-full bg-ngo-green text-white font-bold py-3 rounded-xl hover:bg-green-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                                    >
                                        Generate QR Code
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full flex flex-col items-center animate-fade-in">
                                    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 mb-6">
                                        <QRCode value={upiString} size={200} viewBox={`0 0 256 256`} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                                    </div>
                                    
                                    <p className="text-2xl font-bold text-gray-900 mb-2">₹{amount}</p>
                                    <p className="text-gray-500 mb-6 text-sm">Scan with GPay, PhonePe, or Paytm</p>

                                    {/* Mobile Deep Link Buttons */}
                                    <div className="md:hidden w-full max-w-sm mb-6 grid grid-cols-2 gap-3">
                                        <a href={upiString} className="bg-gray-800 text-white font-bold py-3 rounded-xl hover:bg-black transition shadow-sm text-sm">
                                            Default UPI
                                        </a>
                                        <a href={upiString.replace('upi://', 'tez://')} className="bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-sm text-sm">
                                            Google Pay
                                        </a>
                                        <a href={upiString.replace('upi://', 'phonepe://')} className="bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition shadow-sm text-sm">
                                            PhonePe
                                        </a>
                                        <a href={upiString.replace('upi://', 'paytmmp://')} className="bg-blue-400 text-white font-bold py-3 rounded-xl hover:bg-blue-500 transition shadow-sm text-sm">
                                            Paytm
                                        </a>
                                    </div>

                                    <button 
                                        onClick={() => setShowQR(false)}
                                        className="text-gray-500 underline hover:text-gray-800 text-sm mb-6"
                                    >
                                        Change Amount
                                    </button>

                                    {/* Payment Confirmation Button */}
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="w-full bg-blue-900/5 text-blue-900 border border-blue-200 font-bold py-3 rounded-xl hover:bg-blue-50 transition shadow-sm flex items-center justify-center gap-2"
                                    >
                                        <span>✅</span> I have completed payment
                                    </button>
                                </div>
                            )}
                            
                            <p className="text-xs text-gray-400 mt-8 border-t pt-4 w-full">
                                100% of your donation goes directly to Ooruni Foundation. No payment gateway involved.
                            </p>
                        </div>
                    )}

                    {/* Bank Transfer */}
                    {activeTab === 'bank' && (
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 animate-fade-in">
                            <div className="flex items-center gap-3 mb-6">
                                <Landmark className="text-ngo-green" size={28} />
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Bank Transfer</h2>
                            </div>
                            <div className="space-y-4 text-gray-700">
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-sm text-gray-500 mb-1">Account Name</p>
                                    <p className="font-bold text-gray-900 text-lg">OORUNI FOUNDATION</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <p className="text-sm text-gray-500 mb-1">Account Number</p>
                                        <p className="font-mono font-bold text-gray-900">500101011499464</p>
                                    </div>
                                     <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <p className="text-sm text-gray-500 mb-1">IFSC Code</p>
                                        <p className="font-mono font-bold text-gray-900">CIUB0000295</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-sm text-gray-500 mb-1">Bank Name</p>
                                    <p className="font-bold text-gray-900">City Union Bank, Chitlappakkam Branch</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* CONFIRMATION FORM MODAL */}
                {showForm && (
                     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto animate-fade-in relative">
                            <button 
                                onClick={() => setShowForm(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                            
                            {!submitted ? (
                                <>
                                    <div className="text-center mb-6">
                                        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🎉</div>
                                        <h3 className="text-2xl font-bold text-gray-900">Confirm Donation</h3>
                                        <p className="text-gray-500 text-sm">Please verify your details for the receipt.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Donor Name *</label>
                                            <input required type="text" name="name" onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ngo-green outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                                            <input required type="email" name="email" onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ngo-green outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone (Optional)</label>
                                            <input type="tel" name="phone" onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ngo-green outline-none" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Amount (₹)</label>
                                                <input disabled value={amount} className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">UTR / Ref No *</label>
                                                <input required type="text" name="utr" placeholder="Trans ID" onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ngo-green outline-none" />
                                            </div>
                                        </div>
                                        
                                        <button 
                                            type="submit" 
                                            disabled={loading}
                                            className="w-full bg-ngo-green text-white font-bold py-3 rounded-xl hover:bg-green-700 transition shadow-lg mt-2 disabled:opacity-50"
                                        >
                                            {loading ? 'Submitting...' : 'Submit Details'}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl animate-bounce">✅</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Details Received!</h3>
                                    <p className="text-gray-600 mb-6">
                                        We have sent a confirmation email to <b>{formData.email}</b>. 
                                        Once your transaction is verified, you will receive the official receipt.
                                    </p>
                                    <button 
                                        onClick={() => { setShowForm(false); setShowQR(false); setSubmitted(false); setAmount(''); }}
                                        className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-black transition"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="mt-12 text-center">
                    <p className="text-gray-600 italic">
                        All donations are eligible for tax exemption under section 80G.
                        <br/>Please contact us after donation for the receipt.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Donate;
