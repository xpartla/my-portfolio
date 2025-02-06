import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request) {
    const url = new URL(request.url)
    const category = url.searchParams.get("category");
    const searchQuery = url.searchParams.get("search") || '';
    const tag = url.searchParams.get("tag");
    try {
        const images = await prisma.image.findMany({
            where: {
                category: category || undefined,
                OR:[
                    {title: {contains: searchQuery}},
                    {description: {contains: searchQuery}},
                ],
                tags: tag ? {some: {name: tag}} : undefined,
            },
            select: {
                id: true,
                filename: true,
                title: true,
                description: true,
                category: true
            },

        });
        return NextResponse.json(images);
    }
    catch (error) {
        console.error("Error fetching images: ",error);
        return NextResponse.json({error: "Failed to fetch images" }, {status: 500});
    }
}