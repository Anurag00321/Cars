import prisma from "@/app/libs/prismadb";

export const getListingsCount = async () => {
  const totalCount = await prisma.listing.count();
  return totalCount;
}

export default getListingsCount