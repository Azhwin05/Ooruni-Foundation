import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SupporterMarquee = () => {
    const [supporters, setSupporters] = useState([]);

    useEffect(() => {
        const fetchSupporters = async () => {
            try {
                const res = await fetch(`${API_URL}/api/supporters`);
                const data = await res.json();
                setSupporters(data);
            } catch (err) {
                console.error("Failed to fetch supporters", err);
            }
        };
        fetchSupporters();
    }, []);

    // if (supporters.length === 0) return null; // REMOVED to clear "Missing" confusion
    
    // Duplicate list to create seamless loop (or use placeholder if empty)
    const displayList = supporters.length > 0 ? supporters : [
        { _id: 'p1', logo: 'https://via.placeholder.com/150?text=Your+Logo', name: 'Partner With Us', website: '/contact' },
        { _id: 'p2', logo: 'https://via.placeholder.com/150?text=Support+Us', name: 'Join Us', website: '/contact' },
        { _id: 'p3', logo: 'https://via.placeholder.com/150?text=Be+A+Hero', name: 'Donate', website: '/donate' }
    ];
    const marqueeList = [...displayList, ...displayList, ...displayList];

    return (
        <section className="py-20 bg-white border-t border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">People Who Support Us</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    We are grateful to the organizations that believe in our mission and stand with us.
                </p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                {/* Fade Gradients for "Infinity" illusion */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <motion.div 
                    className="flex gap-16 items-center flex-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{ 
                        repeat: Infinity, 
                        ease: "linear", 
                        duration: 40, // Slow and calm
                        repeatType: "loop"
                    }}
                    whileHover={{ animationPlayState: "paused" }} // This doesn't work directly with framer motion animate prop, need CSS or motion value manipulation
                    // Framer motion doesn't support pause on hover easily with simple animate prop. 
                    // Better approach: Use a wrapping div that pauses children via CSS or use useAnimation controls.
                    // However, let's use a simpler CSS animation approach or just accept continuous scroll for MVP if Framer logic gets complex.
                    // Actually, let's stick to standard marquee logic. 
                    // Note: 'animate' prop overrides CSS hover states.
                    // To achieve pause on hover efficiently without complex state, we can use CSS animation instead of Framer Motion for the infinite loop.
                >
                   {/* We will use CSS animation defined in global styles or Tailwind arbitrary values for the pause effect */}
                </motion.div>
                
                 {/* Alternate Implementation: Pure CSS Marquee for easier Control */}
                 <div className="flex gap-8 md:gap-16 items-center animate-marquee hover:[animation-play-state:paused] whitespace-nowrap pl-8 md:pl-16">
                    {marqueeList.map((supporter, index) => (
                        <div key={`${supporter._id}-${index}`} className="flex-shrink-0 group/logo">
                            <a 
                                href={supporter.website || '#'} 
                                target={supporter.website ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className={`block relative transition-transform duration-300 ${supporter.website ? 'cursor-pointer' : 'cursor-default'}`}
                            >
                                <img 
                                    src={supporter.logo} 
                                    alt={supporter.name} 
                                    className="h-12 w-auto object-contain filter grayscale opacity-60 brightness-10 transition-all duration-300 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-105"
                                />
                            </a>
                        </div>
                    ))}
                 </div>
            </div>
            
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 60s linear infinite;
                    /* Ensure checking 'supporters' length to adjust duration if needed */
                }
            `}</style>
        </section>
    );
};

export default SupporterMarquee;
