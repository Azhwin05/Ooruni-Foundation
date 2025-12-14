import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, BookOpen, TreePine, Users, Heart, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import SupporterMarquee from '../components/SupporterMarquee';

// Placeholder images for the marquee
const marqueeImages = [
    "/images/home_marquee/1.png",
    "/images/home_marquee/2.png",
    "/images/home_marquee/3.png",
    "/images/home_marquee/4.png",
    "/images/home_marquee/5.png",
    "/images/home_marquee/6.png",
    "/images/home_marquee/7.png",
    "/images/home_marquee/8.png",
    "/images/home_marquee/9.png",
];

const Home = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const textRef = React.useRef(null);

    return (
        <div className="bg-ngo-cream min-h-screen text-ngo-text font-sans">
            
            {/* HERO SECTION */}
            <section className="pt-24 pb-12 px-4 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Desktop Only Tags */}
                    <div className="hidden md:flex justify-center gap-8 mb-6 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                        <span>Education</span>
                        <span>Environment</span>
                        <span>Equal Opportunity</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-bold mb-6 font-display leading-tight text-gray-900">
                        Empowering Communities,<br />
                        <span className="text-ngo-green">Transforming Lives.</span>
                    </h1>

                    <p className="hidden md:block text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join Ooruni Foundation to bridge the gap between resources and needs. 
                        We build a better future through education, environmental care, and social equity.
                    </p>
                    {/* Mobile Only Short Text */}
                    <p className="md:hidden text-lg text-gray-600 mb-8 px-2">
                        Bridging gaps in Education, Environment, and Equity.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-4 w-full md:w-auto px-4 md:px-0">
                        <Link to="/donate" className="w-full md:w-auto">
                            <button className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition flex items-center justify-center gap-2">
                                Donate Now <Heart size={20} className="fill-current" />
                            </button>
                        </Link>
                        <Link to="/volunteer" className="w-full md:w-auto">
                            <button className="w-full md:w-auto bg-white border border-gray-300 text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition flex items-center justify-center">
                                Join as Volunteer
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </section>

             {/* MOBILE QUICK ACTIONS ROW (App-Like) */}
             <section className="md:hidden py-6 px-4">
                <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                     <Link to="/donate" className="flex flex-col items-center gap-2 text-ngo-green">
                        <div className="bg-green-50 p-3 rounded-full">
                            <Heart size={24} className="fill-current" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider">Donate</span>
                     </Link>
                     <div className="w-px h-10 bg-gray-200"></div>
                     <Link to="/volunteer" className="flex flex-col items-center gap-2 text-blue-600">
                         <div className="bg-blue-50 p-3 rounded-full">
                            <Users size={24} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider">Volunteer</span>
                     </Link>
                     <div className="w-px h-10 bg-gray-200"></div>
                     <Link to="/contact" className="flex flex-col items-center gap-2 text-orange-500">
                         <div className="bg-orange-50 p-3 rounded-full">
                            <Calendar size={24} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider">Events</span>
                     </Link>
                </div>
            </section>

            {/* MARQUEE SECTION (Simulating the curved strip) */}
            <section className="py-12 overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ngo-cream to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ngo-cream to-transparent z-10 pointer-events-none"></div>
                
                <motion.div 
                    className="flex gap-6 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{ 
                        repeat: Infinity, 
                        ease: "linear", 
                        duration: 30 
                    }}
                >
                    {[...marqueeImages, ...marqueeImages, ...marqueeImages].map((src, index) => (
                        <div key={index} className="inline-block w-48 h-64 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition duration-300 flex-shrink-0">
                            <img src={src} alt="Gallery" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* MANTRA / FLASHLIGHT REVEAL SECTION */}
            <section 
                className="py-32 bg-ngo-dark relative overflow-hidden flex items-center justify-center cursor-none"
                onMouseMove={(e) => {
                    if (!textRef.current) return;
                    const { left, top } = textRef.current.getBoundingClientRect();
                    mouseX.set(e.clientX - left);
                    mouseY.set(e.clientY - top);
                }}
            >
                {/* 1. Background Content (Subtle Pattern) */}
                <div className="absolute inset-0 opacity-20 pattern-dots pattern-gray-500 pattern-bg-transparent pattern-size-4 pattern-opacity-100"></div>

                <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                    
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 inline-block"
                    >
                         <span className="py-2 px-6 border border-ngo-green/30 rounded-full text-ngo-green font-bold tracking-[0.3em] text-sm uppercase bg-ngo-green/5 backdrop-blur-md">
                            Our Philosophy
                        </span>
                    </motion.div>

                    {/* 2. Base Dark Text (The "Unlit" State) */}
                    <div className="relative" ref={textRef}>
                        {/* Volumetric Back Glow */}
                        <motion.div 
                            className="absolute -inset-32 bg-ngo-green/20 rounded-full blur-3xl pointer-events-none z-0"
                            style={{
                                x: mouseX,
                                y: mouseY,
                                translateX: "-50%",
                                translateY: "-50%",
                                opacity: 0.5,
                            }}
                        />

                        <h2 className="relative z-10 text-4xl md:text-7xl font-bold text-white/10 leading-tight select-none font-ancient">
                            "மகிழ்வித்து மகிழ்,<br /> <span className="opacity-50">வையம் வாழ வாழ்"</span>
                        </h2>

                        {/* 3. Illuminated Text (The "Lit" State) - Masked by Cursor (Desktop) */}
                        <motion.div 
                            className="absolute inset-0 z-20 pointer-events-none hidden md:block"
                            style={{
                                maskImage: useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                                WebkitMaskImage: useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                            }}
                        >
                            <h2 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ngo-green via-emerald-400 to-teal-500 leading-tight drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-text-shimmer bg-[length:200%_auto] font-ancient">
                                "மகிழ்வித்து மகிழ்,<br /> <span className="text-white">வையம் வாழ வாழ்"</span>
                            </h2>
                        </motion.div>

                        {/* 4. Illuminated Text (The "Lit" State) - Always Visible (Mobile) */}
                        <div className="absolute inset-0 z-20 pointer-events-none md:hidden">
                            <h2 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ngo-green via-emerald-400 to-teal-500 leading-tight drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-text-shimmer bg-[length:200%_auto] font-ancient">
                                "மகிழ்வித்து மகிழ்,<br /> <span className="text-white">வையம் வாழ வாழ்"</span>
                            </h2>
                        </div>
                    </div>

                    <p className="mt-12 text-white/40 max-w-lg mx-auto text-sm tracking-wide uppercase hidden md:block">
                        Hover to reveal the light within
                    </p>
                </div>
            </section>

            {/* PEOPLE WHO SUPPORT US */}
            <SupporterMarquee />

             {/* STATS STRIP (Minimal) */}
             <section className="py-12 border-t border-b border-gray-200 bg-white">
                <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <h4 className="text-4xl font-bold text-gray-900 mb-1">2015</h4>
                        <p className="text-gray-500 text-sm tracking-wider uppercase">Founded</p>
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-gray-900 mb-1">100+</h4>
                        <p className="text-gray-500 text-sm tracking-wider uppercase">Volunteers</p>
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-gray-900 mb-1">50+</h4>
                        <p className="text-gray-500 text-sm tracking-wider uppercase">Schools Helped</p>
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-gray-900 mb-1">10k+</h4>
                        <p className="text-gray-500 text-sm tracking-wider uppercase">Lives Impacted</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
