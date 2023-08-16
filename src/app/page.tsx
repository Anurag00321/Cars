
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

  return (
    <main className="bg-beige pt-[64px] md:pt-0">
      <Suspense fallback={<LoadingComponent />}>
        <Landing currentUser={currenUser!} />
        <div className="max-w-7xl max-h-lg mx-auto my-auto py-20 sm:px-6 lg:px-6 bg-beige">
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
}

export default Home