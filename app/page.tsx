import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";

type Image = {
    id: number;
    filename: string;
    title: string;
    description: string;
    src: string;
    alt: string;
};

async function fetchImages(tag:string): Promise<Image[]> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/images?tag=${tag}`);
    const data = await res.json();
    return data.map((img: Image) => ({
        id: img.id,
        src: `/images/${img.filename}`,
        alt: img.title,
    }));
}


export default async function Home() {
    const filmImages = await fetchImages('film');
    const digitalImages = await fetchImages('digital');

    return (
        <div className={"row"}>
            {/*Film Gallery*/}
            <div className={"col-md-6 text-center"}>
                <h2>Film Photography</h2>
                <GalleryGrid images={filmImages}/>
                <Link href={"/gallery?tag=film"}>
                    <button className={"btn btn-primary mt-3"}>Explore film</button>
                </Link>
            </div>
            {/* Digital gallery */}
            <div className={"col-md-6 text-center"}>
                <h2>Digital Photography</h2>
                <GalleryGrid images={digitalImages}/>
                <Link href={"/gallery?tag=digital"}>
                    <button className={"btn btn-primary mt-3"}>Explore Digital</button>
                </Link>
            </div>
        </div>
    )
}