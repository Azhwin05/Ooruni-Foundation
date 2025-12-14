import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import logoTamil from '../assets/logo-tamil.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <nav className="bg-ngo-cream sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="flex-shrink-0 flex items-center justify-start h-16 w-48 md:h-24 md:w-80 relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* English Logo (Base) */}
                        <img 
                            className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-500 ease-in-out mix-blend-multiply ${isHovered ? 'opacity-0' : 'opacity-100'}`} 
                            src={logo} 
                            alt="Ooruni Foundation" 
                        />
                        {/* Tamil Logo (Overlay) */}
                        <img 
                            className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-500 ease-in-out mix-blend-multiply ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
                            src={logoTamil} 
                            alt="Ooruni Foundation Tamil" 
                        />
                    </Link>

                    {/* Centered Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center absolute left-1/2 transform -translate-x-1/2">
                        <Link to="/" className="text-ngo-text font-medium hover:text-ngo-green transition">Home</Link>
                        <Link to="/about" className="text-ngo-text font-medium hover:text-ngo-green transition">About</Link>
                        
                        <div className="relative group">
                            <button 
                                className="flex items-center text-ngo-text font-medium hover:text-ngo-green transition focus:outline-none"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                Work <ChevronDown size={14} className="ml-1" />
                            </button>
                            <div className="absolute left-0 mt-2 w-48 rounded-2xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left p-2">
                                <div className="space-y-1">
                                    <Link to="/work/education" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Education</Link>
                                    <Link to="/work/environment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Environment</Link>
                                    <Link to="/work/equal-opportunity" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Equal Opportunity</Link>
                                    <Link to="/scholarship" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Scholarships</Link>
                                </div>
                            </div>
                        </div>

                        <Link to="/freedom-carnival" className="text-ngo-text font-medium hover:text-ngo-green transition">Events</Link>
                        <Link to="/media" className="text-ngo-text font-medium hover:text-ngo-green transition">Media</Link>
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/contact" className="text-ngo-text font-bold hover:text-ngo-green transition text-sm">Contact</Link>
                        <Link to="/donate">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-ngo-text text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:bg-black flex items-center gap-2 text-sm"
                            >
                                Donate
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button - REMOVED for Bottom Nav App Feel */}
                    {/* <div className="md:hidden flex items-center">
                        <Link to="/donate" className="text-sm font-bold bg-ngo-text text-white px-4 py-2 rounded-full shadow-md">
                            Donate
                        </Link>
                    </div> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
