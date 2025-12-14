import React from 'react';
import { Home, Heart, Image, Phone, Briefcase, Info } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Briefcase, label: 'Work', path: '/work' }, 
        { icon: Heart, label: 'Donate', path: '/donate' },
        { icon: Info, label: 'About', path: '/about' },
        { icon: Phone, label: 'Contact', path: '/contact' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 flex justify-between items-center z-50 md:hidden pb-safe">
            {navItems.map((item) => (
                <NavLink 
                    key={item.label}
                    to={item.path}
                    className={({ isActive }) => 
                        `flex flex-col items-center gap-1 transition-colors ${
                            isActive ? 'text-ngo-green font-bold' : 'text-gray-400 hover:text-gray-600'
                        }`
                    }
                >
                    <item.icon size={24} />
                    <span className="text-[10px] uppercase tracking-wide">{item.label}</span>
                </NavLink>
            ))}
        </div>
    );
};

export default BottomNav;
