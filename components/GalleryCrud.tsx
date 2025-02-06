'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Image {
    id: number;
    title: string;
    description: string;
    filename: string;
}

export default function Gallery() {
    const [images, setImages] = useState<Image[]>([]);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    async function fetchImages() {
        try {
            const response = await axios.get('/api/images');
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images', error);
        }
    }

    async function handleUpload() {
        if (!selectedImage) return;

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', tags);

        try {
            await axios.post('/api/images', formData);
            fetchImages();
            resetForm();
        } catch (error) {
            console.error('Error uploading image', error);
        }
    }

    async function handleEdit(image: Image) {
        setTitle(image.title);
        setDescription(image.description);
        setEditingId(image.id);
    }

    async function handleUpdate() {
        if (!editingId) return;

        try {
            await axios.put(`/api/images/${editingId}`, {
                title,
                description,
                tags
            });
            fetchImages();
            resetForm();
        } catch (error) {
            console.error('Error updating image', error);
        }
    }

    async function handleDelete(id: number) {
        try {
            await axios.delete(`/api/images/${id}`);
            fetchImages();
        } catch (error) {
            console.error('Error deleting image', error);
        }
    }

    function resetForm() {
        setTitle('');
        setDescription('');
        setTags('');
        setSelectedImage(null);
        setEditingId(null);
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Gallery</h2>
            <div className="mb-3">
                <input type="file" className="form-control" onChange={(e) => setSelectedImage(e.target.files?.[0] || null)} />
                <input type="text" className="form-control mt-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea className="form-control mt-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="text" className="form-control mt-2" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
                <button className="btn btn-primary mt-2" onClick={editingId ? handleUpdate : handleUpload}>
                    {editingId ? 'Update' : 'Upload'}
                </button>
            </div>

            <div className="row">
                {images.map((image) => (
                    <div key={image.id} className="col-md-4 mb-3">
                        <div className="card">
                            <img src={`/images/${image.filename}`} className="card-img-top" alt={image.title} />
                            <div className="card-body">
                                <h5 className="card-title">{image.title}</h5>
                                <p className="card-text">{image.description}</p>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(image)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(image.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
