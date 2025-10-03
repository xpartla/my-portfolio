import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params; // notice the await here
    const { title, description, tags } = await request.json();

    try {
        const tagNames = tags
            .split(",")
            .map((tag: string) => tag.toLowerCase().trim());

        const connectOrCreateTags = tagNames.map((tagName: string) => ({
            where: { name: tagName },
            create: { name: tagName },
        }));

        const updatedImage = await prisma.image.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                tags: {
                    set: [],
                    connectOrCreate: connectOrCreateTags,
                },
            },
        });

        return NextResponse.json(updatedImage, { status: 200 });
    } catch (err) {
        console.error("Error updating image", err);
        return NextResponse.json(
            { error: "Failed to update image" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        await prisma.image.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ message: "Image Deleted" }, { status: 204 });
    } catch (err) {
        console.error("Error deleting image", err);
        return NextResponse.json(
            { error: "Failed to delete image" },
            { status: 500 }
        );
    }
}
