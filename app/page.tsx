import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";

export default function Home(){
    const filmImages = [
        {id:1, src: '/images/image1.jpg', alt: 'Film Image 1'},
    ];

    const digitalImages = [
        {id:1, src: '/images/image2.jpg', alt: 'Digital Image 2'},
    ];
    return (
        <div className={"row"}>
            {/*Film Gallery*/}
            <div className={"col-md-6 text-center"}>
                <h2>Film Photography</h2>
                <GalleryGrid images={filmImages} />
                <Link href={"/gallery/film"}>
                    <button className={"btn btn-primary mt-3"}>Explore film</button>
                </Link>
            </div>
            {/* Digital gallery */}
            <div className={"col-md-6 text-center"}>
                <h2>Digital Photography</h2>
                <GalleryGrid images={digitalImages} />
                <Link href={"/gallery/digital"}>
                    <button className={"btn btn-primary mt-3"}>Explore Digital</button>
                </Link>
            </div>
        </div>
    )
}