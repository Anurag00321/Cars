import { prisma } from '../libs/prismadb'
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
    
    const listingEmail = await prisma.user.findUnique({
      where: {
        id: listing?.userId
      },
      select: {
        email: true
      }
    })

    // const listingData = {
    //   listing ? [listing] : [],
    //   listingEmail
    // }

    // return (listingData);
    
    // return listing ? [{ listing, listingEmail }] : [];
    // return listing ? [[listing], listingEmail] : [];
    // return { listing, listingEmail };
    return listing ? [listing] : [];
  } catch (error: any) {
    console.log(error)
    return null;
  }
};

export default getListingBySlug;