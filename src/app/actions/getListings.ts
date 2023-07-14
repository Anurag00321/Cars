// import prismadb from '@/app/libs/prismadb'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const getListings = async () => {

    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });
        // console.log(listings)
        return listings;
    } catch (error: any) {
        console.log(error)
        return [];
    }
}

export default getListings