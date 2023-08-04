import prisma from "@/app/libs/prismadb";

export const GetPopularMake = async (date?: Date) => {

  const result = await prisma.listing.groupBy({
    where: {
      createdAt: {
        gte: date ? date : ""
      }
    },
    by: ['make'],
    _count: {
      make: true,
    },
    orderBy: {
      _count: {
        make: 'desc',
      },
    },
    take: 1,
  });

  const mostPopularMake = result[0]?.make || 'Unknown';
  return mostPopularMake;
};

export default GetPopularMake;