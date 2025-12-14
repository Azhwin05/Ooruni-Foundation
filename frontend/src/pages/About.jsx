import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Target, Eye, User, X } from 'lucide-react';

// TEAM DATA
const teamMembers = [
    { name: "Rathinavel Rajan S", role: "Founder and Managing Trustee", image: "/team/RR.jpg" },
    { name: "Sankar Sundaralingam", role: "Co-founder and Trustee", image: "/team/SS.webp" },
    { name: "Ponnuswamy Perumal", role: "Trustee", image: "/team/PP.webp" },
    { name: "Arumugam", role: "Trustee", image: "/team/AA.webp" },
    { name: "Arun Kumar", role: "Treasurer and Trustee", image: "/team/AK.webp" },
    { name: "Ezhilvel", role: "Trustee", image: "/team/EZ.webp" }
];

// COMPONENT: TEAM CARD (Handles Desktop Hover & Mobile Click)
const TeamMemberCard = ({ member }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showMobileModal, setShowMobileModal] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect Mobile Device
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleInteraction = () => {
        if (isMobile) setShowMobileModal(true);
    };

    return (
        <>
            {/* CARD */}
            <div 
                className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4 group cursor-none"
                onMouseEnter={() => !isMobile && setIsHovered(true)}
                onMouseLeave={() => !isMobile && setIsHovered(false)}
                onClick={handleInteraction}
            >
                <div className="w-12 h-12 bg-ngo-green/10 rounded-full flex items-center justify-center text-ngo-green group-hover:bg-ngo-green group-hover:text-white transition-colors">
                    <User size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                </div>

                {/* DESKTOP HOVER PREVIEW */}
                <AnimatePresence>
                    {isHovered && !isMobile && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-50 left-full ml-4 top-1/2 -translate-y-1/2 w-48 bg-white p-2 rounded-xl shadow-xl border border-gray-100 hidden md:block pointer-events-none"
                        >
                            <div className="rounded-lg overflow-hidden h-40 w-full mb-2 bg-gray-100">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-center text-xs font-bold text-gray-700 pb-1">{member.name}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* MOBILE MODAL */}
            <AnimatePresence>
                {showMobileModal && (
                    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowMobileModal(false)}>
                        <motion.div 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-white w-full max-w-sm rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setShowMobileModal(false)}
                                className="absolute top-3 right-3 bg-black/50 text-white p-1 rounded-full z-10 hover:bg-black/70 transition"
                            >
                                <X size={20} />
                            </button>
                            <div className="h-64 w-full bg-gray-200">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-ngo-green font-medium">{member.role}</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

const About = () => {
    const [expanded, setExpanded] = useState('vision');

    return (
        <div className="pt-10 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-br from-teal-900 to-ngo-green py-20 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">About Ooruni Foundation</h1>
                    <p className="text-lg md:text-xl text-green-50 font-medium">Committed to sustainable community development</p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl">
                {/* WHO WE ARE - Styled Card */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-12 md:mb-16"
                >
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-ngo-yellow/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-l-4 border-ngo-yellow pl-4 relative z-10">Who We Are</h2>
                        <p className="text-gray-700 text-lg leading-loose relative z-10">
                            Ooruni Foundation is a registered Trust and Non-Governmental Organization (NGO) formed by six members during the Chennai floods in 2015. Today, we have grown into a family of over 100 dedicated volunteers, most of whom are corporate employees. We anchor, augment, and advocate the pivotal 3Es of human life—<span className="font-bold text-ngo-green">Education, Environment, and Equal Opportunities</span>—for sustainable community development.
                        </p>
                    </div>
                </motion.section>

                {/* VISION & MISSION */}
                {/* Mobile Accordion View */}
                {/* VISION & MISSION - Mobile Tabs */}
                <div className="md:hidden mb-16">
                    {/* Tab Nav */}
                    <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                        <button 
                            onClick={() => setExpanded('vision')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 ${expanded === 'vision' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                        >
                            <Eye size={16} /> Vision
                        </button>
                        <button 
                            onClick={() => setExpanded('mission')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 ${expanded === 'mission' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500'}`}
                        >
                            <Target size={16} /> Mission
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[200px]">
                        {expanded === 'vision' ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                key="vision"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                        <Eye size={24} />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">Our Vision</h2>
                                </div>
                                <blockquote className="text-lg font-medium text-gray-800 italic mb-4">
                                    "மகிழ்வித்து மகிழ், <br/>
                                    வையம் வாழ வாழ்"
                                </blockquote>
                                <p className="text-gray-600 text-sm">
                                    Meaning: <span className="font-bold text-blue-600">Happy to make others happy, Live to make the world live.</span>
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                key="mission"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                        <Target size={24} />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">Our Mission</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    To create a sustainable ecosystem where every individual has access to quality education, a clean environment, and equal opportunities for growth, regardless of their background or ability.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Desktop Grid View */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <Eye className="text-blue-500" size={32} />
                            <h2 className="text-2xl font-bold">Our Vision</h2>
                        </div>
                        <blockquote className="text-xl font-medium text-gray-800 italic mb-4">
                            "மகிழ்வித்து மகிழ், <br/>
                            வையம் வாழ வாழ்"
                        </blockquote>
                        <p className="text-gray-600">
                            Meaning: <span className="font-bold text-blue-600">Happy to make others happy, Live to make the world live.</span>
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <Target className="text-green-500" size={32} />
                            <h2 className="text-2xl font-bold">Our Mission</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            To create a sustainable ecosystem where every individual has access to quality education, a clean environment, and equal opportunities for growth, regardless of their background or ability.
                        </p>
                    </motion.div>
                </div>

                {/* MEET OUR TEAM - Mobile Horizontal Scroll + Desktop Grid */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="flex items-center justify-between mb-8 px-2 md:px-0">
                         <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-ngo-yellow pl-4">Meet Our Team</h2>
                         <span className="md:hidden text-xs font-bold text-gray-400 uppercase tracking-widest">Swipe →</span>
                    </div>
                    
                    {/* Mobile Swiper */}
                    <div className="md:hidden flex overflow-x-auto gap-4 pb-8 snap-x -mx-4 px-4 scrollbar-hide">
                         {teamMembers.map((member, index) => (
                            <div key={index} className="min-w-[280px] snap-center bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-ngo-green/10 rounded-full flex items-center justify-center text-ngo-green mb-4">
                                     <User size={32} />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                                <p className="text-sm text-ngo-green font-medium">{member.role}</p>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Grid */}
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                        {teamMembers.map((member, index) => (
                            <TeamMemberCard key={index} member={member} />
                        ))}
                    </div>
                </motion.section>

                {/* AWARDS */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-ngo-yellow pl-4">Awards & Recognitions</h2>
                    <div className="bg-white p-8 rounded-xl shadow border border-gray-100 flex items-start gap-6">
                        <Award className="text-yellow-500 flex-shrink-0" size={48} />
                        <div>
                            <h3 className="text-xl font-bold mb-2">100 Working Women Achievers Book</h3>
                            <p className="text-gray-600">
                                Published the book "100 Working Women Achievers" as part of our WWAA initiative, recognizing inspiring women across various fields.
                            </p>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default About;
