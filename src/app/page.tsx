'use client'

import { SessionProvider } from 'next-auth/react';
import ListingsList from './listings/components/ListingsList';
import { Listing } from "@prisma/client";
import { useState } from 'react';
import ListingsFilter from './listings/components/ListingsFilter';
import SelectMenu from '../../components/selectMenu';

interface ListingsListProps {
  initialItems: Listing[];
}

const Home: React.FC<ListingsListProps> = ({initialItems}) => {

  const items2 = ListingsList.name

  const [items, setItems] = useState(initialItems)

  return (
<main className="relative w-full h-full">
  <img
    className="w-full max-h-[32rem] object-cover opacity-80"
    src="https://images.unsplash.com/photo-1584125630041-90db781c7068?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    alt="Cover Image"
  />
  <div className="bg-slate-950">
    <div className="absolute inset-0 flex mx-auto max-w-5xl bg-slate-950 bg-opacity-60">
      <div className="flex flex-col flex-wrap gap-y-28 gap-x-20 justify-center max-w-3xl max-h-md px-16">
        <select>
        {items?.map((item) => (
          <option key={item.id}>{item.make}</option>
        ))}
          {/* <option>MAKE</option>
          <option>BMW</option>
          <option>AUDI</option>
          <option>PORSCHE</option>
          <option>TEST</option> */}
        </select>
        <select>
          <option>YEAR</option>
        </select>
        <select>
          <option>TEST</option>
        </select>
        <select>
          <option>TEST2</option>
        </select>
        <select>
          <option>FUEL</option>
        </select>
        <select>
          <option>TYPE</option>
        </select>
      </div>
    </div>
  </div>
  <SelectMenu data={items} field="model"/>
  {/* <ListingsFilter initialItems={listings}/> */}
  <p>home page</p>
</main>
  )
}

export default Home