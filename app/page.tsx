import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";


type Image = {
    id: number;
    filename: string;
    title: string;
    description: string;
    src: string;
    alt: string;
    width: number;
    height: number;
};

async function fetchImages(tag:string): Promise<Image[]> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/images?tag=${tag}`);
    const data = await res.json();
    return data.map((img: Image) => ({
        id: img.id,
        src: `/images/${img.filename}`,
        alt: img.title,
        width: img.width,
        height: img.height,
    }));
}

function getRandomImages(images:Image[]):Image[] {
    return images
        .sort(()=> Math.random() - 0.5)
}

function checkLandscape(image:Image):boolean {
    return image.width > image.height;
}

function fixImageOrder(images: Image[]): Image[] {
    if (images.length < 3) return images;

    const fixedImages: Image[] = [];

    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        if (checkLandscape(img)) {
            const prev1 = fixedImages[fixedImages.length - 1];
            const prev2 = fixedImages[fixedImages.length - 2];

            if (
                prev1 && prev2 &&
                !(checkLandscape(prev1) || (!checkLandscape(prev1) && !checkLandscape(prev2)))
            ) {
                continue;
            }
            const next1 = images[i + 1];
            const next2 = images[i + 2];

            if (next1 && !checkLandscape(next1)) {
                if (next2 && !checkLandscape(next2)) {
                    fixedImages.push(img, next1, next2);
                    i += 2;
                }
            } else if (next1 && checkLandscape(next1)) {
                fixedImages.push(img, next1);
                i += 1;
            }
        } else {
            fixedImages.push(img);
        }
    }

    return fixedImages;
}

export default async function Home() {
    const filmImages = getRandomImages(await fetchImages('film'));
    const digitalImages = getRandomImages(await fetchImages('digital'));
    const film = fixImageOrder(filmImages);
    const digital = fixImageOrder(digitalImages);
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