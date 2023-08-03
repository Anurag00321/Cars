
import { SessionProvider } from 'next-auth/react';
import ListingsList from './listings/components/ListingsList';
import { Listing } from "@prisma/client";
import ListingsFilter from './listings/components/ListingsFilter';
import getListings from './actions/getListings';
import Landing from '../../components/landing';
import getCurrentUser from './actions/getCurrentUser';

interface ListingsListProps {
  initialItems: Listing[];
}

const Home: React.FC<ListingsListProps> = async ({initialItems}) => {

  const listings = await getListings();
  const currenUser = await getCurrentUser() 

  const items2 = ListingsList.name

  // const [items, setItems] = useState(initialItems)

  return (
  <main className="absolute w-full h-full bg-beige">
      <Landing currentUser={currenUser!}/>
    <ListingsFilter initialItems={listings}/>
    {/* <ListingsList initialItems={listings} featured={true}/> */}
  </main>
  )
}

export default Home