import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Calendar, Image, GraduationCap, LogOut, Users, ScanLine, Heart, Target, Building2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
    const { dispatch } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    }

    const navItems = [
        { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/news', icon: <Newspaper size={20} />, label: 'News' },
        { path: '/events', icon: <Calendar size={20} />, label: 'Events' },
        { path: '/gallery', icon: <Image size={20} />, label: 'Gallery' },
        { path: '/scholarships', icon: <GraduationCap size={20} />, label: 'Scholarships' },
        { path: '/volunteers', icon: <Users size={20} />, label: 'Volunteers' },
        { path: '/verify-volunteer', icon: <ScanLine size={20} />, label: 'Verify Volunteer' },
        { path: '/donations', icon: <Heart size={20} />, label: 'Donations' },
        { path: '/oes', icon: <Target size={20} />, label: 'OES Board' },
        { path: '/supporters', icon: <Building2 size={20} />, label: 'Partners' },
    ];

    return (
        <div className="w-64 bg-admin-primary text-white h-screen flex flex-col fixed left-0 top-0 overflow-y-auto hidden md:flex">
            <div className="p-6">
                <h1 className="text-2xl font-bold">Ooruni CMS</h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <Link 
                        key={item.path} 
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${location.pathname === item.path ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-300 hover:text-red-100 w-full">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
