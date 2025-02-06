import React from 'react';
import Image from 'next/image';

type Image = {
    id:number;
    src: string;
    alt: string;
};

export default function GalleryGrid({images}: {images: Image[]}) {
    return (
        <div className={"row"}>
            {images.map((image)=>(
                <div key={image.id} className={"col-6 col-md-4 mb-4 position-relative"} style={{height: "200px"}}>
                    <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="img-fluid"
                    style={{objectFit: "scale-down"}}
                    />
                </div>
            ))}
        </div>
    );
}