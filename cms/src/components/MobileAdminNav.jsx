import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, Image, QrCode, Heart, Target } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const MobileAdminNav = () => {
    const { logout } = useContext(AuthContext);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dash', path: '/dashboard' },
        { icon: QrCode, label: 'Verify', path: '/verify-volunteer' },
        { icon: Heart, label: 'Donate', path: '/donations' },
        { icon: Target, label: 'OES', path: '/oes' },
        { icon: Users, label: 'Vols', path: '/volunteers' },
        { icon: Image, label: 'Media', path: '/gallery' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 flex justify-between items-center z-50 md:hidden pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            {navItems.map((item) => (
                <NavLink 
                    key={item.label}
                    to={item.path}
                    className={({ isActive }) => 
                        `flex flex-col items-center gap-1 transition-colors ${
                            isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                        }`
                    }
                >
                    <item.icon size={24} />
                    <span className="text-[10px] font-bold uppercase">{item.label}</span>
                </NavLink>
            ))}
            <button onClick={logout} className="flex flex-col items-center gap-1 text-red-400">
                <div className="h-6 w-6 rounded-full border-2 border-red-400 flex items-center justify-center font-bold text-xs">
                    X
                </div>
                <span className="text-[10px] font-bold uppercase">Exit</span>
            </button>
        </div>
    );
};

export default MobileAdminNav;
