import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"
import path from "path";
import formidable from "formidable";
import {Readable} from "node:stream";
import {IncomingMessage} from "node:http";

const prisma = new PrismaClient()
const uploadDir = path.resolve(process.cwd(), "public/images");

export const config = {
    api: {
        bodyParser: false,
    }
}

function requestToReadable(request: Request) {
    const reader = request.body?.getReader(); // Web API ReadableStream reader
    return new Readable({
        async read() {
            if (!reader) return this.push(null);
            const {done, value} = await reader.read();
            if (done) return this.push(null);
            this.push(value);
        },
    });
}

async function parseForm(request: Request){
    const form = formidable({uploadDir, keepExtensions: true});

    return new Promise((resolve, reject) => {
        const readableStream = requestToReadable(request);
        if (readableStream instanceof IncomingMessage) {
            form.parse(readableStream, (err: any, fields: any, files: any) => {
                if (err) reject(err);
                resolve({fields, files});
            });
        }
    });
}

export async function POST(request: Request){
    try{
        const {fields, files}: any = await parseForm(request);

        const {title, description, tags} = fields;
        const filename = path.basename(files.image.filePath);

        const tagNames = tags.split(",").map((tag:string) => tag.toLowerCase().trim());
        const connectOrCreateTags = tagNames.map((tagName: string) => ({
            where: {name:tagName},
            create: {name:tagName},
        }));

        const image = await prisma.image.create({
            data: {
                filename,
                title,
                description,
                tags:{
                    connectOrCreate: connectOrCreateTags,
                },
            },
        });
        return NextResponse.json(image,{status:201});
    }
    catch(err){
        console.error("Error uploading image", err);
        return NextResponse.json({error: "failed to upload image", status: 500});
    }
}


export async function GET(request: Request) {
    const url = new URL(request.url)
    const searchQuery = url.searchParams.get("search") || '';
    const tag = url.searchParams.get("tag");
    try {
        const images = await prisma.image.findMany({
            where: {
                tags: tag ? {some: {name: tag}} : undefined,
                OR:[
                    {title: {contains: searchQuery}},
                    {description: {contains: searchQuery}},
                ],
            },
            select: {
                id: true,
                filename: true,
                title: true,
                description: true,
            },

        });
        return NextResponse.json(images);
    }
    catch (error) {
        console.error("Error fetching images: ",error);
        return NextResponse.json({error: "Failed to fetch images" }, {status: 500});
    }
}