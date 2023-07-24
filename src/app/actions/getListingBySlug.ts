import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getListingBySlug = async (
  slug: string
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }
  
    const listing = await prisma.listing.findUnique({
      where: {
        slug: slug
      },
    });

    return listing ? [listing] : [];
  } catch (error: any) {
    console.log(error)
    return null;
  }
};

export default getListingBySlug;