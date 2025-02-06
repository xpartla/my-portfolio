import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient({})

async function main() {
    const tag1 = await prisma.tag.create({data:{name:"nature"}});
    const tag2 = await prisma.tag.create({data:{name:"portrait"}});
    const tag3 = await prisma.tag.create({data:{name:"film"}});
    const tag4 = await prisma.tag.create({data:{name:"digital"}});

    await prisma.image.create({
        data:{
            title:"Film Image 1",
            description: "Nature captured on film",
            filename: "image1.jpg",
            category: "film",
            tags:{
                connect: [{id:tag1.id}, {id:tag3.id}],
            },
        },
    });

    await prisma.image.create({
        data: {
            title: 'Digital Image 1',
            description: 'A stunning digital capture.',
            filename: 'image2.jpg',
            category: 'digital',
            tags: {
                connect: [{ id: tag2.id }, { id: tag4.id }], // Connect tags by ID
            },
        },
    });

    await prisma.image.create({
        data: {
            title: 'Film Image 2',
            description: 'A stunning film capture.',
            filename: 'image3.jpg',
            category: 'film',
            tags: {
                connect: [{ id: tag2.id }, { id: tag3.id }], // Connect tags by ID
            },
        },
    });
}

main()
.then(() => console.log('Seed Done'))
.catch((err) => console.log(err))
.finally(async () => await prisma.$disconnect());