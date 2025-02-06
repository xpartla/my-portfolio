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