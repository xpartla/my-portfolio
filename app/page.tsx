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

function getRandomImages(images:Image[], count:number = 6):Image[] {
    return images
        .sort(()=> Math.random() - 0.5)
        .slice(0, count);
}

function balanceGallery(filmImages: Image[], digitalImages:Image[]):{film: Image[], digital: Image[]}{
    let filmCount = filmImages.length;
    let digitalCount = digitalImages.length;
    while (filmCount !== digitalCount) {
        if (filmCount > digitalCount) {
            filmImages.pop();
            filmCount--;
        }
        else{
            digitalImages.pop();
            digitalCount--;
        }
    }
    return {film:filmImages, digital:digitalImages};
}

export default async function Home() {
    const filmImages = getRandomImages(await fetchImages('film'));
    const digitalImages = getRandomImages(await fetchImages('digital'));
    const {film, digital} = balanceGallery(filmImages, digitalImages);
    return (
        <div className={"row"}>
            {/*Film Gallery*/}
            <div className={"col-md-6 text-center"}>
                <h2>Film Photography</h2>
                <GalleryGrid images={film}/>
                <Link href={"/gallery?tag=film"}>
                    <button className={"btn btn-primary mt-3"}>Explore film</button>
                </Link>
            </div>
            {/* Digital gallery */}
            <div className={"col-md-6 text-center"}>
                <h2>Digital Photography</h2>
                <GalleryGrid images={digital}/>
                <Link href={"/gallery?tag=digital"}>
                    <button className={"btn btn-primary mt-3"}>Explore Digital</button>
                </Link>
            </div>
        </div>
    )
}