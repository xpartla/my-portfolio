import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"
import path from "path";
import {promises as fs} from "fs";
import imageSize from "image-size";

const prisma = new PrismaClient();
const uploadDir = path.join(process.cwd(), "public/images");

export async function POST(request: Request){
    try{
        const formData = await request.formData();
        const imageFile = formData.get("image") as File;
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const tags = formData.get("tags") as string;

        const buffer = Buffer.from(await  imageFile.arrayBuffer());

        const dimensions = imageSize(buffer);

        const width = dimensions.width;
        const height = dimensions.height;

        const filename = `${Date.now()}-${imageFile.name}`
        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, buffer);

        const tagNames = tags.split(",").map((tag) => tag.toLowerCase().trim());
        const connectOrCreateTags = tagNames.map((tagName)=>({
            where: {name: tagName},
            create: {name: tagName},
        }));
        const image = await prisma.image.create({
            data:{
                filename,
                title,
                description,
                width,
                height,
                tags:{
                    connectOrCreate: connectOrCreateTags,
                },
            },
        });

        return NextResponse.json(image, {status: 201});
    }
    catch(err){
        console.log("Error uploading image", err);
        return NextResponse.json("Failed to upload image", {status: 500});
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
                    {tags: {some: {name: {contains: searchQuery}}}},
                ],
                ...(tag ? {tags: {some: {name: tag}}}: {})
            },
            select: {
                id: true,
                filename: true,
                title: true,
                description: true,
                tags: {select: {name: true}},
                width: true,
                height: true,
            },

        });
        return NextResponse.json(images);
    }
    catch (error) {
        console.error("Error fetching images: ",error);
        return NextResponse.json({error: "Failed to fetch images" }, {status: 500});
    }
}