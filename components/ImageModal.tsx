'use client';
import Image from 'next/image'
import {motion} from 'framer-motion';

type ImageModalProps = {
    image: {
        src: string;
        alt: string;
    }
    onClose: () => void;
}
export default function ImageModal({image, onClose}: ImageModalProps) {

    return(
        <motion.div
            className={"modal-overlay"}
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            onClick={onClose}
        >
            <motion.div
                className={"modal-content"}
                initial={{scale:0.8}}
                animate={{scale:1}}
                exit={{scale:0.8}}
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="modal-image"
                    onClick={(e) => e.stopPropagation()}
                />
            </motion.div>
        </motion.div>
    )
}