
import { SessionProvider } from 'next-auth/react';
import ListingsList from './listings/components/ListingsList';
import { Listing } from "@prisma/client";
// import { useState } from 'react';
import ListingsFilter from './listings/components/ListingsFilter';
import SelectMenu from '../../components/selectMenu';
import getListings from './actions/getListings';

interface ListingsListProps {
  initialItems: Listing[];
}

const Home: React.FC<ListingsListProps> = async ({initialItems}) => {

  const listings = await getListings();

  const items2 = ListingsList.name

  // const [items, setItems] = useState(initialItems)

  return (
  <main className="relative w-full h-full">
    <img
      className="w-full max-h-[32rem] object-cover opacity-80"
      src="https://images.unsplash.com/photo-1584125630041-90db781c7068?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      alt="Cover Image"
    />
  <ListingsFilter initialItems={listings}/>
  </main>
  )
}

export default Home