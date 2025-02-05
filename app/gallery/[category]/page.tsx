'use client';
import { useParams } from 'next/navigation';
import GalleryGrid from "@/components/GalleryGrid";

const filmImages = [
    { id: 1, src: '/images/film1.jpg', alt: 'Film Image 1' },
    // More film images
];

const digitalImages = [
    { id: 1, src: '/images/digital1.jpg', alt: 'Digital Image 1' },
    // More digital images
];

export default function GalleryCategoryPage(){
    const {category} = useParams();

    const images = category === "film" ? filmImages : digitalImages;
    return (
        <div>
          <h1 className={"text-center mb-4"}>{category} Photography</h1>
          <GalleryGrid images={images} />
        </div>
    );
}