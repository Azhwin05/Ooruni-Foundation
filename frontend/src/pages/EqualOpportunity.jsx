import React from 'react';
import { HeartHandshake, Mic, AlertTriangle, UserCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EqualOpportunity = () => {
    return (
        <div className="pt-20 pb-20 container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-ngo-dark mb-4">Equal Opportunity & Empowerment</h1>
                <p className="text-xl text-gray-600">Building an inclusive society for all.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                {/* Give Their World */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                        <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600"><HeartHandshake size={24} /></div>
                        Give Their World
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Supports differently-abled individuals by providing aids, appliances, and mentorship to help them lead independent lives.
                    </p>
                </div>

                {/* Freedom Carnival */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-yellow-500">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Freedom Carnival</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Flagship annual Independence Day event for special needs children. Activities include Parkour, dance sessions, puppetry, and talent showcases.
                    </p>
                    <Link to="/freedom-carnival" className="text-yellow-600 font-bold hover:underline inline-flex items-center gap-1">
                        View Event Details <ArrowRight size={16} />
                    </Link>
                </div>

                {/* We Are Your Voice */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Mic size={24} /></div>
                        We Are Your Voice
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        A unique job fair connecting HR professionals & companies directly with differently-abled youth for job placement, bridging the gap between talent and opportunity.
                    </p>
                </div>

                {/* Rehabilitation */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-4">Disaster Rehabilitation</h2>
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex gap-3">
                            <span className="w-2 h-2 rounded-full bg-red-400 mt-2 block shrink-0"></span>
                            <span><strong>Kerala Floods (2018):</strong> Provided essential relief materials and support.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-2 h-2 rounded-full bg-red-400 mt-2 block shrink-0"></span>
                            <span><strong>Gaja Cyclone (2018):</strong> Delivered 3 tons of relief materials and chain saw machines for clearing debris.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Social Awareness & Women Empowerment */}
            <div className="mt-16">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Social Awareness & Empowerment</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <AlertTriangle className="mx-auto mb-4 text-orange-500" size={32} />
                        <h3 className="font-bold text-lg mb-2">Safety Awareness</h3>
                        <p className="text-sm text-gray-600">Accident-Free Nation & Suicide Free Tamil Nadu campaigns.</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <UserCheck className="mx-auto mb-4 text-purple-500" size={32} />
                        <h3 className="font-bold text-lg mb-2">AWAKE</h3>
                        <p className="text-sm text-gray-600">Women empowerment initiative featuring startup meets and POSH seminars.</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg text-center border-2 border-purple-200">
                        <UserCheck className="mx-auto mb-4 text-purple-700" size={32} />
                        <h3 className="font-bold text-lg mb-2">WWAA</h3>
                        <p className="text-sm text-gray-600">Working Women Achievers Award & Book release.</p>
                        <Link to="/wwaa" className="text-purple-700 text-sm font-bold block mt-2 hover:underline">Learn More</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EqualOpportunity;
