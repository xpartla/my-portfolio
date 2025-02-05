import React from 'react';

type Image = {
    id:number;
    src: string;
    alt: string;
};

export default function GalleryGrid({images}: {images: Image[]}) {
    return (
        <div className={"row"}>
            {images.map((image)=>(
                <div key={image.id} className={"col-6 col-md-4 mb-4"}>
                    <img
                    src={image.src}
                    alt={image.alt}
                    className="img-fluid"
                    style={{maxHeight: "200px", objectFit: "cover"}}
                    />
                </div>
            ))}
        </div>
    );
}