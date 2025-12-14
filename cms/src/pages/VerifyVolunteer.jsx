import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import { API_URL } from '../api';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

const VerifyVolunteer = () => {
    const [scanResult, setScanResult] = useState(null);
    const [volunteer, setVolunteer] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Added loading state
    // Assuming 'user' context or state is available, e.g., from a global context or prop
    // For this example, we'll mock a 'user' object. In a real app, you'd get this from AuthContext or similar.
    const user = { token: 'mock-auth-token' }; 

    useEffect(() => {
        // Initialize Scanner only if we don't have a result yet
        if (!scanResult) {
            const scanner = new Html5QrcodeScanner(
                "reader", 
                { fps: 10, qrbox: { width: 250, height: 250 } },
                /* verbose= */ false
            );

            scanner.render(onScanSuccess, onScanFailure);

            function onScanSuccess(decodedText, decodedResult) {
                // Handle the scanned code as you like, for example:
                console.log(`Code matched = ${decodedText}`, decodedResult);
                setScanResult(decodedText);
                scanner.clear(); // Stop scanning
                verifyVolunteer(decodedText);
            }

            function onScanFailure(error) {
                // handle scan failure, usually better to ignore and keep scanning.
                // console.warn(`Code scan error = ${error}`);
            }

            return () => {
                scanner.clear().catch(error => console.error("Failed to clear html5-qrcode scanner. ", error));
            };
        }
    }, [scanResult]);

    const verifyVolunteer = async (encryptedData) => {
        setLoading(true);
        setError(null);
        setVolunteer(null);

        try {
            const res = await axios.post(`${API_URL}/volunteer/verify-qr`, { encryptedData }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (res.data.valid) {
                setVolunteer(res.data.volunteer);
                setError(null);
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Verification Failed");
            setVolunteer(null);
        } finally {
            setLoading(false);
        }
    };

    const resetScan = () => {
        setScanResult(null);
        setVolunteer(null);
        setError(null);
    };

    return (
        <div className="p-4 md:p-6 w-full max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-8">
                Verify Volunteer
            </h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Scanner Section */}
                <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg">
                    {!scanResult ? (
                        <>
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">Scan QR Code</h2>
                            <div id="reader" className="w-full"></div>
                        </>
                    ) : (
                        <div className="text-center py-10">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">Scan Complete</h2>
                            <button 
                                onClick={resetScan}
                                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg mx-auto hover:bg-blue-700"
                            >
                                <RefreshCw size={20} /> Scan Another
                            </button>
                        </div>
                    )}
                </div>

                {/* Result Section */}
                <div className="w-full md:w-1/2">
                    {volunteer && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center shadow-lg animate-fade-in">
                            <div className="flex justify-center mb-6">
                                <CheckCircle className="text-green-500 w-16 h-16" />
                            </div>
                            <h2 className="text-2xl font-bold text-green-800 mb-2">Verified Volunteer</h2>
                            
                            <div className="mt-6 flex flex-col items-center">
                                <div className="h-40 w-40 rounded-full border-4 border-green-500 overflow-hidden shadow-md mb-4 bg-white">
                                    {volunteer.photo ? (
                                        <img src={`http://localhost:5000${volunteer.photo}`} alt={volunteer.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-gray-400">No Photo</div>
                                    )}
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900">{volunteer.name}</h3>
                                <p className="text-gray-600 text-lg">{volunteer.email}</p>
                                <p className="text-gray-500 mt-2">{volunteer.phone}</p>
                                
                                <span className="mt-4 px-4 py-1 bg-green-200 text-green-800 rounded-full text-sm font-semibold uppercase tracking-wide">
                                    {volunteer.status}
                                </span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center shadow-lg animate-fade-in">
                             <div className="flex justify-center mb-6">
                                <XCircle className="text-red-500 w-16 h-16" />
                            </div>
                            <h2 className="text-2xl font-bold text-red-800 mb-2">Access Denied</h2>
                            <p className="text-red-600 text-lg">{error}</p>
                        </div>
                    )}
                    
                    {!volunteer && !error && (
                         <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center flex flex-col items-center justify-center h-full text-gray-400">
                             <p>Scan a QR code to view volunteer details.</p>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyVolunteer;
