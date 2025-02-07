'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

interface Image {
    id: number;
    title: string;
    description: string;
    filename: string;
    tags: string;
}

export default function Gallery() {
    const [images, setImages] = useState<Image[]>([]);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [editingImageId, setEditingImageId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);

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

    async function handleEdit(id: number) {
        setEditingImageId(id);
    }

    async function handleSave(image: Image) {
        try {
            const updatedTags = Array.isArray(image.tags)
                ? image.tags.map(tag => tag.name).join(', ')
                : image.tags;

            await axios.put(`/api/images/${image.id}`, {
                title: image.title,
                description: image.description,
                tags: updatedTags,
            });

            fetchImages();
            setEditingImageId(null);
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
        setEditingImageId(null);
        setShowForm(false);
    }

    function handleChange(imageId: number, field: keyof Image, value: string) {
        setImages((prevImages) =>
            prevImages.map((img) => (img.id === imageId ? { ...img, [field]: value } : img))
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Gallery</h2>

            <button className={"btn btn-primary mb-3"} onClick={()=> setShowForm(!showForm)}>
                {showForm ? "Hide Form" : "Add Image"}
            </button>

            {showForm && (
                <div className="mb-3">
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                    />
                    <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="form-control mt-2"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Tags (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                    <button className="btn btn-primary mt-2" onClick={handleUpload}>
                        Upload
                    </button>
                </div>
            )}


            <div className="row">
                {images.map((image) => (
                    <div key={image.id} className="col-md-4 mb-3">
                        <div className="card">
                            <Image
                                src={`/images/${image.filename}`}
                                alt={image.title}
                                width={2000}
                                height={2000}
                                className={"img-fluid card-img-top"}
                            />
                            <div className="card-body">
                                {editingImageId === image.id ? (
                                    <>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={image.title}
                                            onChange={(e) => handleChange(image.id, 'title', e.target.value)}
                                        />
                                        <textarea
                                            className="form-control mb-2"
                                            value={image.description}
                                            onChange={(e) => handleChange(image.id, 'description', e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={
                                                Array.isArray(image.tags)
                                                    ? image.tags.map(tag => tag.name).join(', ')
                                                    : image.tags
                                            }
                                            onChange={(e) => handleChange(image.id, 'tags', e.target.value)}
                                        />
                                        <button className="btn btn-success me-2" onClick={() => handleSave(image)}>
                                            Save
                                        </button>
                                        <button className="btn btn-secondary" onClick={() => setEditingImageId(null)}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h5 className="card-title">{image.title}</h5>
                                        <p className="card-text">{image.description}</p>
                                        <p className="card-text">
                                            <strong>Tags:</strong>{' '}
                                            {Array.isArray(image.tags)
                                                ? image.tags.map(tag => tag.name).join(', ') || 'No tags'
                                                : 'No tags'}
                                        </p>
                                        <button className="btn btn-warning me-2" onClick={() => handleEdit(image.id)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(image.id)}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
