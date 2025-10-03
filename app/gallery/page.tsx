'use client';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import GalleryGrid from "@/components/GalleryGrid";

type Image = {
    id:number,
    src: string;
    alt: string;
    title: string;
    description: string;
};

type ApiImage = {
    id: number;
    filename: string;
    title: string;
    description: string;
    width: number;
    height: number;
};


export default function GalleryCategoryPage(){
    const searchParams = useSearchParams();
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState(true);
    const searchQuery = searchParams.get('search') || '';
    const selectedTag = searchParams.get('tag') || '';
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/images?tag=${selectedTag}&search=${searchQuery}`, { cache: "no-store" });
                const data: ApiImage[] = await res.json();
                setImages(data.map((img) => ({
                    id: img.id,
                    src: `/images/${img.filename}`,
                    alt: img.title,
                    title: img.title,
                    description: img.description,
                })));
            }
            catch(err){
                console.log("Failed to fetch images.", err);
            }
            finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [searchQuery, selectedTag]);

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <h1 className={"text-center mb-4"}> {selectedTag} Photography</h1>
            <GalleryGrid images={images}/>
        </div>
    );
}