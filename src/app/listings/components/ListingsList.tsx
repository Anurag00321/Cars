'use client';

import { Listing } from "@prisma/client";
import { useContext, useState, useEffect } from 'react';
import { ListingsFilter, FilterContext } from "./ListingsFilter";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ListingsListProps {
    initialItems: Listing[];
}

const ListingsList: React.FC<ListingsListProps> = ({initialItems}) => {

  const [items, setItems] = useState(initialItems)
  
  const initialFilters = useContext(FilterContext)

  const [filteredState, setFilteredState] = useState(initialFilters || [])

  const [filteredItems, setFilteredItems] = useState(filteredState || []);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()

  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const currentArr = Array.from(current)
  const search = current.toString();
  const query = search ? `?${search}` : "";
  const test = `${pathname}${query}`
  
  // const search2 = searchParams.getAll(`make + model`)

  const make = searchParams.get(`make`)
  const model = searchParams.get(`model`)
  const price = searchParams.get(`price`)

  useEffect(() => {
    const filteredMake = items?.filter(item => item.make == make);
    const filteredModel = items?.filter(item => item.model == model);
    const filteredPrice = items?.filter(item => Number(item.price) <= Number(price));
    make ? setFilteredItems(filteredMake) : ''
    model ? setFilteredItems(filteredModel) : ""
    price ? setFilteredItems(filteredPrice) : ""
  }, [items]);

  // if(make) {
  //   setFilteredItems(filteredItems.filter(item => item.make === make));
  // }

  // if(model) {
  //   setFilteredItems(filteredItems.filter(item => item.model === model));
  // }

  const testCurrent = () => {
    // console.log('make', make)
    // console.log('searchParams',searchParams.toString())
    // console.log('current',current)
    // console.log('query', query)
    // console.log('test', test)
    console.log(filteredItems)
  }

  return (
  <>
  <button onClick={testCurrent}>test</button>
  <div className="flex flex-row">
  {filteredItems?.map((item) => (
    <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <img className="h-48 w-full object-cover object-center" src="https://images.unsplash.com/photo-1599076311391-28adf17fade5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Product Image" />
      <div className="p-4">
        <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{item.title}</h2>
        <h3 className="mb-2 text-md font-medium dark:text-white text-gray-900">{item.year}, {item.fuel}, {item.mileage}</h3>
        <p className="mb-2 text-base dark:text-gray-300 text-gray-700">{item.body}</p>
        <div className="flex items-center">
          <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">€{item.price}</p>
        </div>
      </div>
    </div>
  ))}
  </div>
  </>
  )
 
  }


export default ListingsList