import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-white pt-10 md:pt-20 pb-10 font-sans">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="md:w-1/3">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold font-display tracking-tight text-white mb-2">Ooruni Foundation</h2>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                                "மகிழ்வித்து மகிழ், <br/>
                                வையம் வாழ வாழ்"
                            </p>
                        </div>
                        <div className="flex space-x-5">
                            <a href="https://www.facebook.com/oorunifoundation/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-ngo-green hover:text-white transition-all duration-300">
                                <Facebook size={18} />
                            </a>
                            <a href="https://www.linkedin.com/company/ooruni-foundation/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-ngo-green hover:text-white transition-all duration-300">
                                <Linkedin size={18} />
                            </a>
                            <a href="https://youtube.com/@oorunimedia1269?si=4-08MHww3G-t3KRi" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-ngo-green hover:text-white transition-all duration-300">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-8 text-left">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">Organization</h3>
                            <ul className="space-y-4 text-gray-300 text-sm">
                                <li><Link to="/about" className="hover:text-ngo-green transition">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-ngo-green transition">Contact</Link></li>
                                <li><Link to="/media" className="hover:text-ngo-green transition">Media & Press</Link></li>
                                <li><Link to="/volunteer" className="hover:text-ngo-green transition">Volunteer</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">Our Work</h3>
                            <ul className="space-y-4 text-gray-300 text-sm">
                                <li><Link to="/work/education" className="hover:text-ngo-green transition">Education</Link></li>
                                <li><Link to="/work/environment" className="hover:text-ngo-green transition">Environment</Link></li>
                                <li><Link to="/work/equal-opportunity" className="hover:text-ngo-green transition">Equal Opportunity</Link></li>
                                <li><Link to="/scholarship" className="hover:text-ngo-green transition">Scholarships</Link></li>
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-1 mt-8 md:mt-0">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">Get Involved</h3>
                            <div className="space-y-4">
                                <Link to="/donate">
                                    <button className="w-full bg-ngo-green hover:bg-ngo-dark text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2">
                                        <Heart size={18} className="fill-current" />
                                        Donate Now
                                    </button>
                                </Link>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Your support transforms lives. Join us in making a difference today.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                    <p>© {new Date().getFullYear()} Ooruni Foundation. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-gray-400">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
