'use client';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import GalleryGrid from "@/components/GalleryGrid";

type Image = {
    id:number,
    src: string;
    alt: string;
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
                const res = await fetch(`/api/images?tag=${selectedTag}&search=${searchQuery}`);
                const data = await res.json();
                setImages(data.map((img: any) => ({
                    id: img.id,
                    src: `/images/${img.filename}`,
                    alt: img.title,
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