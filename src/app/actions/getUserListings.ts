// import prismadb from '@/app/libs/prismadb'
import { PrismaClient } from '@prisma/client';
import getCurrentUser from './getCurrentUser';

const prisma = new PrismaClient()

const getUserListings = async () => {

    const currentUser = await getCurrentUser();

    try {
        const listings = await prisma.listing.findMany({
            where: {
                id: currentUser?.id
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        return listings;
    } catch (error: any) {
        console.log(error)
        return [];
    }
}

export default getUserListings