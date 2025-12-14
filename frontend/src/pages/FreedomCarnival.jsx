import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

const FreedomCarnival = () => {
    return (
        <div className="pt-20 pb-20 container mx-auto px-4 max-w-5xl">
            {/* Header */}
            <div className="relative rounded-3xl overflow-hidden mb-12 h-64 md:h-96 bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                <img 
                    src="/freedom_carnival_logo.png" 
                    alt="Freedom Carnival" 
                    className="w-auto h-full object-contain p-8"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                    <div className="prose lg:prose-xl">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">About The Event</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Freedom Carnival is our flagship annual event celebrating Independence Day with special needs children. It is a day filled with joy, talent, and inclusivity. We organize various activities such as Parkour, collaborative dance sessions, puppetry, and a grand talent showcase where children perform on stage.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            Since 2017, this event has brought smiles to hundreds of children and their families, fostering a sense of belonging and confidence.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Gallery</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {/* Placeholder Gallery */}
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                     <img src={`https://source.unsplash.com/random/400x400?kids,happy&sig=${item}`} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition duration-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                        <h3 className="font-bold text-orange-800 text-xl mb-4">Event Details</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-700">
                                <Calendar className="text-orange-600" />
                                <span>August 15th (Annually)</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <MapPin className="text-orange-600" />
                                <span>Chennai, Tamil Nadu</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <Users className="text-orange-600" />
                                <span>500+ Participants</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-center">
                        <h3 className="font-bold text-blue-800 text-xl mb-2">Join Us</h3>
                        <p className="text-gray-600 mb-4 text-sm">Want to volunteer for the next carnival?</p>
                        <button className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition">Register as Volunteer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreedomCarnival;
