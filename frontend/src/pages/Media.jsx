import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../api';
import { Image, Newspaper, Calendar } from 'lucide-react';

const Media = () => {
    const [images, setImages] = useState([]);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('photos'); // photos, coverage

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Gallery Images
                const galleryRes = await axios.get(`${API_URL}/gallery`);
                setImages(galleryRes.data);

                // Fetch News for Press Coverage
                const newsRes = await axios.get(`${API_URL}/news`);
                setNews(newsRes.data);
            } catch (err) {
                console.error(err);
                // Fallback mock data if API fails is handled by UI
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="pt-20 pb-20 container mx-auto px-4 min-h-screen">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Media & Gallery</h1>
                <p className="text-xl text-gray-600">Glimpses of our journey and impact.</p>
            </div>

            {/* Tabs */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
                <button 
                    onClick={() => setActiveTab('photos')}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold transition w-full sm:w-auto ${activeTab === 'photos' ? 'bg-ngo-green text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    <Image size={20} /> Photo Gallery
                </button>
                <button 
                    onClick={() => setActiveTab('coverage')}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold transition w-full sm:w-auto ${activeTab === 'coverage' ? 'bg-ngo-green text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    <Newspaper size={20} /> Press Coverage
                </button>
            </div>

            {/* Content */}
            {activeTab === 'photos' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4">
                    {loading ? (
                        <p className="col-span-full text-center text-gray-500">Loading images...</p>
                    ) : images.length > 0 ? (
                        images.map((img) => (
                            <div key={img._id} className="relative group overflow-hidden rounded-lg shadow-md aspect-square md:aspect-video cursor-pointer bg-white">
                                <img src={img.url} alt={img.caption} className="w-full h-full object-cover transition duration-300 group-hover:scale-110" />
                                
                                {/* Desktop Hover Overlay */}
                                <div className="hidden md:flex absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 items-end p-4">
                                    <p className="text-white font-medium opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-4 group-hover:translate-y-0">{img.caption}</p>
                                </div>

                                {/* Mobile Caption Below */}
                                <div className="md:hidden p-3">
                                    <p className="text-gray-800 font-medium text-sm truncate">{img.caption || 'Gallery Image'}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No images found.</p>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {loading ? (
                       <p className="col-span-full text-center text-gray-500">Loading coverage...</p>
                    ) : news.length > 0 ? (
                        news.map((item) => (
                            <div key={item._id} className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition">
                                {item.image && (
                                    <div className="h-48 overflow-hidden rounded mb-4">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                    <Calendar size={14} />
                                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h3>
                                {item.link && (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                                        Read Full Article &rarr;
                                    </a>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                             <p>No press coverage articles found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Media;
