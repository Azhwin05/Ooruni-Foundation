import React from 'react';
import { motion } from 'framer-motion';
import { TreePine, Wind, CloudRain, Sprout } from 'lucide-react';

const Environment = () => {
    return (
        <div className="pt-20 pb-20 container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-ngo-dark mb-4">Environment Initiatives</h1>
                <p className="text-xl text-gray-600">Restoring nature, one sapling at a time.</p>
            </div>

            <div className="space-y-12">
                {/* Mass Plantation */}
                <div className="flex flex-col md:flex-row gap-8 items-center bg-green-50 p-6 md:p-8 rounded-2xl border border-green-100">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white p-3 rounded-full shadow-sm">
                                <TreePine size={32} className="text-green-700" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-green-800">Mass Plantation Drive</h2>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            In partnership with Max Life Insurance Co., we have conducted extensive plantation drives to increase green cover and promote biodiversity in urban and semi-urban areas.
                        </p>
                    </div>
                </div>

                {/* Project Seeds */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-green-100 p-3 rounded-full text-green-600">
                            <Sprout size={32} />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Project Seeds</h2>
                    </div>
                    <div className="relative">
                        {/* Central Line - Growing Animation */}
                        <motion.div 
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-green-200 transform md:-translate-x-1/2 origin-top"
                        ></motion.div>

                        <div className="space-y-12">
                            {[
                                {
                                    id: 1,
                                    date: "14th August 2017",
                                    title: "Seed 1",
                                    desc: "More than 100 trees were planted by the volunteers along with the participants at the premises of National Institute for Empowerment of Persons with Multiple Disabilities (NIEPMD), Muttukadu, Chennai during Independence Day and Freedom Carnival celebration."
                                },
                                {
                                    id: 2,
                                    date: "26th March 2018",
                                    title: "Seed 2",
                                    desc: "As part of our #TimeToGrow Campaign, we reached out to 1500 interested students of the Chennai Middle School at Trustpuram. This is an initiative by myHarvest to encourage children to learn the joy of growing and we partnered with them for this project."
                                },
                                {
                                    id: 3,
                                    date: "29th March 2018",
                                    title: "Seed 3",
                                    desc: "As part of our #TimeToGrow Campaign, as our second attempt, we reached out to interested students and distributed 3000 seed boxes at Middle School, Medavakkam."
                                },
                                {
                                    id: 4,
                                    date: "8th June 2019",
                                    title: "Seed 4",
                                    desc: "This Plantation drive taken shape to commemorate the World Environment Day, at Government Boy’s Higher Secondary School, Nandhivaram, Guduvanchery, Chennai. Followed by this we had Mass Plantation Drive at the following places and so far we planted around 3700 saplings across different districts of Tamil Nadu."
                                },
                                {
                                    id: 5,
                                    date: "17th August 2019",
                                    title: "Seed 5",
                                    desc: "At Government College of Technology, Coimbatore."
                                },
                                {
                                    id: 6,
                                    date: "14th September 2019",
                                    title: "Seed 6",
                                    desc: "At Thirumalai Engineering College, Kanchipuram."
                                },
                                {
                                    id: 7,
                                    date: "21st September 2019",
                                    title: "Seed 7",
                                    desc: "At Coimbatore Institute of Technology, Coimbatore."
                                }
                            ].map((seed, index) => (
                                <motion.div 
                                    key={seed.id} 
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    
                                    {/* Spacer for desktop alignment */}
                                    <div className="hidden md:block w-1/2"></div>
                                    
                                    {/* Timeline Node (Leaf Icon) - Pop In Animation */}
                                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ type: "spring", stiffness: 200, delay: 0.2 + (index * 0.1) }}
                                            className="w-12 h-12 bg-white border-4 border-green-500 rounded-full flex items-center justify-center shadow-md"
                                        >
                                            <Sprout size={20} className="text-green-600 fill-current" />
                                        </motion.div>
                                    </div>

                                    {/* Content Card - Slide In Animation */}
                                    <div className="w-full md:w-1/2 pl-24 md:px-12">
                                        <motion.div 
                                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                                            className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative group"
                                        >
                                            {/* Arrow for Desktop */}
                                            <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-50 rotate-45 border-b border-l border-gray-100 ${index % 2 === 0 ? '-right-2 border-r border-t border-b-0 border-l-0' : '-left-2'}`}></div>

                                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-3 uppercase tracking-wider group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                                {seed.date}
                                            </span>
                                            <h3 className="font-bold text-xl text-gray-800 mb-2">{seed.title}</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                {seed.desc}
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Crisis Response */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-red-500">
                    <div className="flex items-center gap-3 mb-6">
                        <Wind size={32} className="text-red-500" />
                        <h2 className="text-2xl font-bold text-gray-800">Crisis Response & Rehabilitation</h2>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded mt-1">2016</span>
                            <p className="text-gray-700"><strong className="block text-gray-900">Cyclone Vardah</strong> Cleared 12,000 fallen trees to restore access roads and power lines.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded mt-1">Ongoing</span>
                            <p className="text-gray-700"><strong className="block text-gray-900">Nanmangalam Reserve Forest</strong> Regular cleanup drives to protect the local ecosystem.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded mt-1">Event</span>
                            <p className="text-gray-700"><strong className="block text-gray-900">Marina Beach Cleanup</strong> Supported crowd management and cleanup during Jallikattu protests traffic regulation.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Environment;
