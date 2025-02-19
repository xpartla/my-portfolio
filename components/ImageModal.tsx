'use client';
import Image from 'next/image'
import {motion} from 'framer-motion';

type ImageModalProps = {
    image: {
        id:number;
        src: string;
        alt: string;
        title: string;
        description: string;
    }
    onClose: () => void;
}
export default function ImageModal({image, onClose}: ImageModalProps) {

    return(
        <motion.div
            className={"modal-overlay row"}
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            onClick={onClose}
        >
            <div className={"col-md-6"}>
                <div className={"image-border-wrapper"}>
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={800}
                        height={600}
                        className="modal-image"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            </div>
            <motion.div
                className={"col-md-4 modal-description"}
            >
                <p className={"modal-image-title"}>{image.title}</p>
                <p className={"modal-image-description"}>{image.description}</p>
            </motion.div>
        </motion.div>
    )
}