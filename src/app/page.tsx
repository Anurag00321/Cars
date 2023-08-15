
import { SessionProvider } from 'next-auth/react';
import ListingsList from './listings/components/ListingsList';
import { Listing } from "@prisma/client";
import ListingsFilter from './listings/components/ListingsFilter';
import getListings from './actions/getListings';
import Landing from '../../components/landing';
import getCurrentUser from './actions/getCurrentUser';
import { Suspense } from 'react';
import LoadingComponent from './loading';

interface ListingsListProps {
  initialItems: Listing[];
}

const Home: React.FC<ListingsListProps> = async ({initialItems}) => {

  const listings = await getListings();
  const currenUser = await getCurrentUser()

//   return (
// <main className="absolute w-full h-screen bg-beige">
//   <div className="flex flex-col gap-y-[60%] sm:gap-y-[50%] md:gap-y-[43%] h-full bg-beige">
//     <Landing currentUser={currenUser!} />
//     <ListingsFilter initialItems={listings} />
//     <div className="flex flex-col bg-beige pb-10 items-center justify-center z-10"> {/* Adjust z-index */}
//       <p className="pt-8 font-bold text-3xl font-rubik text-british-green-1">Featured listings</p>
//       <ListingsList initialItems={listings} featured={true} />
//     </div>
//   </div>
// </main>
//   )

  return (
    <main className="bg-beige">
      <Suspense fallback={<LoadingComponent />}>
      <Landing currentUser={currenUser!} />
      <div className="max-w-7xl max-h-lg mx-auto my-auto py-6 sm:px-6 lg:px-8 bg-beige">
        <div className="px-4 py-4 sm:px-0">
          <div className="h-72" />
          <ListingsFilter initialItems={listings} />
          {/* <p className="pt-8 font-bold text-3xl font-rubik text-british-green-1">Featured listings</p> */}
          <ListingsList initialItems={listings} featured={true} />
        </div>
      </div>
      </Suspense>
    </main>
  )

//   return (
//     <main className="absolute w-full min-h-full bg-beige">
//     <div className="flex items-center justify-between h-16">
//     <div className="flex items-center">    
//     <Landing currentUser={currenUser!} />
//     <ListingsFilter initialItems={listings} />
//       <p className="pt-8 font-bold text-3xl font-rubik text-british-green-1">Featured listings</p>
//       <ListingsList initialItems={listings} featured={true} />
//     </div>
//   </div>
// </main>
//   )
}

export default Home