import React from 'react';
import Sidebar from './Sidebar';
import MobileAdminNav from './MobileAdminNav';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* Desktop Sidebar */}
            <div className="hidden md:block fixed inset-y-0 left-0 z-50">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 pb-20 md:pb-0 transition-all duration-300">
                {children}
            </div>

            {/* Mobile Bottom Nav */}
            <MobileAdminNav />
        </div>
    );
};

export default Layout;
