import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(){
    try {
        const tags = await prisma.tag.findMany();
        return NextResponse.json(tags);
    }
    catch(err){
        console.error("Error fetching tags", err);
        return NextResponse.json({error: "failed to fetch tags"}, {status: 500});
    }
}

export async function POST(request: Request){
    const {name} = await request.json();

    try{
        const tag = await prisma.tag.create({
            data: {name: name},
        });
        return NextResponse.json(tag, {status: 201});
    }
    catch(err){
        console.error("Error creating tag", err);
        return NextResponse.json({error: "failed to create tag", status: 500});
    }
}