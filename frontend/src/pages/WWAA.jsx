import React from 'react';
import { Award, Book, Star } from 'lucide-react';

const WWAA = () => {
    return (
        <div className="pt-20 pb-20 container mx-auto px-4 max-w-5xl">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Working Women Achievers Award (WWAA)</h1>
                <p className="text-xl text-gray-600">Celebrating the indomitable spirit of women.</p>
            </div>

            {/* Intro */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <div className="order-2 md:order-1">
                    <h2 className="text-3xl font-bold text-purple-800 mb-6">Recognizing Excellence</h2>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                        The Working Women Achievers Award is an annual initiative by Ooruni Foundation to identify, recognize, and honor women who have broken barriers and made significant contributions to their fields and society.
                    </p>
                    <button className="px-6 py-3 bg-purple-700 text-white font-bold rounded-full hover:bg-purple-800 transition shadow-lg">
                        Nominate a Woman Achiever
                    </button>
                </div>
                <div className="order-1 md:order-2">
                    <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop" alt="Women Achiever" className="rounded-2xl shadow-xl w-full" />
                </div>
            </div>

            {/* Book Release */}
            <div className="bg-purple-50 rounded-3xl p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <Book className="text-purple-600" size={32} />
                        <h2 className="text-2xl font-bold text-gray-900">"100 Working Women Achievers" Book</h2>
                    </div>
                    <p className="text-gray-700 mb-6">
                        We are proud to have published a book documenting the inspiring stories of 100 women achievers. This book serves as a beacon of hope and motivation for the next generation.
                    </p>
                    <button className="text-purple-700 font-bold hover:underline">Read Preview →</button>
                </div>
                <div className="w-48 h-64 bg-gray-300 rounded shadow-md flex-shrink-0 flex items-center justify-center text-gray-500">
                    Book Cover
                </div>
            </div>

            {/* Gallery */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Past Winners</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="relative group overflow-hidden rounded-xl aspect-[3/4]">
                            <img src={`https://source.unsplash.com/random/300x400?woman,professional&sig=${item}`} alt="Winner" className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 flex items-end p-4">
                                <span className="text-white font-bold">Awardee Name {item}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WWAA;
