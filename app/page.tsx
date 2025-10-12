import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
const IMAGEURL = process.env.NEXT_PUBLIC_IMAGE_BASEURL;

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
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/images?tag=${tag}`, { cache: "no-store" });
    const data = await res.json();
    return data.map((img: Image) => ({
        id: img.id,
        src: `${IMAGEURL}/${img.filename}`,
        alt: img.title,
        width: img.width,
        height: img.height,
        description: img.description,
        title: img.title
    }));
}

function getRandomImages(images:Image[]):Image[] {
    return images
        .sort(()=> Math.random() - 0.5)
}

function checkLandscape(image:Image):boolean {
    return image.width > image.height;
}

function equalizeImagesLength(filmImages: Image[], digitalImages: Image[]): [Image[], Image[]]  {
    while (filmImages.length > digitalImages.length) {
        filmImages.pop()
    }
    while (digitalImages.length > filmImages.length) {
        digitalImages.pop()
    }
    return [filmImages, digitalImages];
}

function balanceImageCount(filmImages: Image[], digitalImages: Image[]): [Image[], Image[]]  {
    const filmLandscapes = filmImages.filter(checkLandscape);
    const digitalLandscapes = digitalImages.filter(checkLandscape);
    const filmPortraits = filmImages.filter(image => filmLandscapes.indexOf(image) < 0);
    const digitalPortraits = digitalImages.filter(image => digitalLandscapes.indexOf(image) < 0);

    if(filmLandscapes.length !== digitalLandscapes.length ){
        equalizeImagesLength(filmLandscapes, digitalLandscapes);
    }
    if(filmPortraits.length !== digitalPortraits.length){
        equalizeImagesLength(filmPortraits, digitalPortraits);
    }


    const film = getRandomImages(filmPortraits.concat(filmLandscapes));
    const digital = getRandomImages(digitalPortraits.concat(digitalLandscapes));
    return [film, digital];
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
    let film = fixImageOrder(filmImages);
    let digital = fixImageOrder(digitalImages);
    [film, digital] = balanceImageCount(film, digital);
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