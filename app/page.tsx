import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import sizeOf from 'image-size'


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

function getRandomImages(images:Image[], count:number = 8):Image[] {
    return images
        .sort(()=> Math.random() - 0.5)
        .slice(0, count);
}

function checkLandscape(image:Image):boolean {
    const size = sizeOf("public/" + image.src)
    if(!size.width || !size.height) {
        return false;
    }
    return size.width > size.height;
}

function fixImageOrder(images:Image[]):Image[] {
    for (let i = 0; i < images.length; i++) {
        if (!images[i] || !images[i+1]){break}

        if (checkLandscape(images[i])) {
            if(checkLandscape(images[i+1])) {
                continue;
            }
            if (images[i+2] && checkLandscape(images[i+2])) {
                images.splice(i+2, 0, images.pop()!)
            }
        }
    }
       return images;
}


export default async function Home() {
    const filmImages = getRandomImages(await fetchImages('film'));
    const digitalImages = getRandomImages(await fetchImages('digital'));
    const film = fixImageOrder(filmImages);
    const digital = fixImageOrder(digitalImages);
    digital.pop();
    return (
        <div className={"row"}>
            <div className={"col-md-6 text-center"}>
                <h2 className={"film-large-heading"}>Film</h2>
                <GalleryGrid images={film}/>
                <Link href={"/gallery?tag=film"}>
                    <button className={"btn-custom mt-3"}>Explore film</button>
                </Link>
            </div>
            <div className={"col-md-6 text-center"}>
                <h2 className={"digital-large-heading"}>Digital</h2>
                <GalleryGrid images={digital}/>
                <Link href={"/gallery?tag=digital"}>
                    <button className={"btn-custom mt-3"}>Explore Digital</button>
                </Link>
            </div>
        </div>
    )
}