import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { API_URL } from '../api';
import { GraduationCap, CheckCircle, AlertCircle } from 'lucide-react';

const Scholarship = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [status, setStatus] = useState(null); // success, error
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        setStatus(null);
        try {
            await axios.post(`${API_URL}/scholarship`, data);
            setStatus('success');
            reset();
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top to see message
        } catch (err) {
            console.error(err);
            setStatus('error');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-10">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                        <GraduationCap size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Scholarship Application</h1>
                    <p className="text-gray-600">Apply for financial aid to support your education.</p>
                </div>

                {status === 'success' && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 flex items-center gap-2">
                        <CheckCircle size={20} />
                        <span>Application submitted successfully! We will contact you soon.</span>
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 flex items-center gap-2">
                        <AlertCircle size={20} />
                        <span>Something went wrong. Please try again later.</span>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name (பெயர்)</label>
                            <input 
                                {...register("name", { required: true })} 
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="Enter your name"
                            />
                            {errors.name && <span className="text-red-500 text-xs">Required</span>}
                        </div>

                        {/* Age */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Age (வயது)</label>
                            <input 
                                type="number" 
                                {...register("age", { required: true })} 
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="Age"
                            />
                            {errors.age && <span className="text-red-500 text-xs">Required</span>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input 
                                type="email"
                                {...register("email", { required: true })} 
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="email@example.com"
                            />
                            {errors.email && <span className="text-red-500 text-xs">Required</span>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (தொலைபேசி)</label>
                            <input 
                                type="tel"
                                {...register("phone", { required: true })} 
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="9876543210"
                            />
                            {errors.phone && <span className="text-red-500 text-xs">Required</span>}
                        </div>

                        {/* Education Level */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Education Level (கல்வி)</label>
                            <select 
                                {...register("educationLevel", { required: true })} 
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            >
                                <option value="">Select Level</option>
                                <option value="School">School (1-12)</option>
                                <option value="College">College (UG/PG)</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.educationLevel && <span className="text-red-500 text-xs">Required</span>}
                        </div>

                        {/* Family Income */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Family Income (வருமானம்)</label>
                            <input 
                                type="number"
                                {...register("familyIncome", { required: true })} 
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="₹ Amount"
                            />
                            {errors.familyIncome && <span className="text-red-500 text-xs">Required</span>}
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address (முகவரி)</label>
                        <textarea 
                            {...register("address", { required: true })} 
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none h-24"
                            placeholder="Your full address"
                        ></textarea>
                        {errors.address && <span className="text-red-500 text-xs">Required</span>}
                    </div>

                    {/* Purpose */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Scholarship (காரணம்)</label>
                        <textarea 
                            {...register("purpose", { required: true })} 
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none h-32"
                            placeholder="Explain why you need this scholarship and how it will help you..."
                        ></textarea>
                        {errors.purpose && <span className="text-red-500 text-xs">Required</span>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-bold text-white transition ${loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                    >
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Scholarship;
