'use client'
import React, {useState} from 'react';
import Image from 'next/image';
import {motion} from 'framer-motion';
import ImageModal from "@/components/ImageModal";

type ImageProps = {
    id:number;
    src: string;
    alt: string;
};

export default function GalleryGrid({images}: {images: ImageProps[]}) {
    const [imageSizes, setImageSizes] = useState<{[key: number]: boolean}>({});
    const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
    return (
        <>
            <motion.div
                className={"gallery-grid"}
                initial = {{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
            >
                {images.map((image, index) => (
                    <motion.div
                        key={image.id}
                        className={`gallery-item ${imageSizes[image.id] ? "landscape" : "portrait"}`}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        onClick={() => {setSelectedImage(image)}}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="gallery-image"
                            onLoadingComplete={(img) => {
                                setImageSizes((prev) => ({
                                    ...prev,
                                    [image.id]: img.naturalWidth > img.naturalHeight,
                                }));
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>
            {selectedImage && (
                <ImageModal
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </>
    );
}