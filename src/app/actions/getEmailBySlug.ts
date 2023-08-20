import { prisma } from '../libs/prismadb'
import getCurrentUser from "./getCurrentUser";

const getEmailBySlug = async (
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
    
    const listingEmail = await prisma.user.findUnique({
      where: {
        id: listing?.userId
      },
      select: {
        email: true
      }
    })

    return listingEmail
  } catch (error: any) {
    console.log(error)
    return null;
  }
};

export default getEmailBySlug;