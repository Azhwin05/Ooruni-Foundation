import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, TreePine, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkMenu = () => {
    const works = [
        { 
            title: "Education", 
            icon: BookOpen, 
            color: "text-yellow-600", 
            bg: "bg-yellow-100", 
            path: "/work/education",
            desc: "Scholarships & Mentorship"
        },
        { 
            title: "Environment", 
            icon: TreePine, 
            color: "text-green-600", 
            bg: "bg-green-100", 
            path: "/work/environment",
            desc: "Plantation & Restoration" 
        },
        { 
            title: "Equal Opportunity", 
            icon: Users, 
            color: "text-purple-600", 
            bg: "bg-purple-100", 
            path: "/work/equal-opportunity",
            desc: "Empowerment & Inclusion" 
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-24 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Work</h1>
            <p className="text-gray-600 mb-8">Select an initiative to explore</p>

            <div className="space-y-4">
                {works.map((work, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link to={work.path} className="block group">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group-hover:shadow-md transition-shadow">
                                <div className={`w-14 h-14 ${work.bg} ${work.color} rounded-xl flex items-center justify-center`}>
                                    <work.icon size={28} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900">{work.title}</h3>
                                    <p className="text-sm text-gray-500">{work.desc}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-ngo-green group-hover:text-white transition-colors">
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default WorkMenu;
