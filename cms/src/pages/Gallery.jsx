import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../api';
import { useDropzone } from 'react-dropzone';

import { AuthContext } from '../context/AuthContext';
import { Upload, Trash2 } from 'lucide-react';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const { user } = useContext(AuthContext);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        const res = await axios.get(`${API_URL}/gallery`);
        setImages(res.data);
    };

    const handleUpload = async (acceptedFiles) => {
        setUploading(true);
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            // 1. Upload File
            const uploadRes = await axios.post(`${API_URL}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const fileUrl = uploadRes.data;

            // 2. Save to DB
            await axios.post(`${API_URL}/gallery`, {
                url: fileUrl,
                category: 'General', // Default, can add selector
                caption: file.name
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            
            fetchImages();
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Delete this image?")) {
            await axios.delete(`${API_URL}/gallery/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchImages();
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop: handleUpload });

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Gallery Management</h1>
            </div>

            {/* Upload Area */}
            <div {...getRootProps()} className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-admin-primary transition mb-8">
                <input {...getInputProps()} />
                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 font-medium">
                    {uploading ? "Uploading..." : "Drag & drop an image here, or click to select"}
                </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {images.map((img) => (
                    <div key={img._id} className="relative group bg-white p-2 rounded shadow">
                        <img src={img.url} alt="Gallery" className="w-full h-32 object-cover rounded" />
                        <button 
                            onClick={() => handleDelete(img._id)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
