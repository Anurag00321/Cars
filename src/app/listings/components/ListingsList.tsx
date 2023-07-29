'use client';

import { Listing } from "@prisma/client";
import { useContext, useState, useEffect } from 'react';
import { ListingsFilter, FilterContext } from "./ListingsFilter";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import getListingBySlug from "@/app/actions/getListingBySlug";

interface ListingsListProps {
    initialItems: Listing[];
    profile?: boolean;
}

const ListingsList: React.FC<ListingsListProps> = ({initialItems, profile}) => {

  const [items, setItems] = useState(initialItems)
  
  const initialFilters = useContext(FilterContext)

  const [filteredState, setFilteredState] = useState(initialFilters || [])

  const [filteredItems, setFilteredItems] = useState(filteredState || []);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()

  const current = new URLSearchParams(Array.from(searchParams.entries()));

  
  // }

  // const currentArr = Array.from(current)
  // const search = current.toString();
  // const query = search ? `?${search}` : "";
  // const test = `${pathname}${query}`

  const make = searchParams.get(`make`)
  const model = searchParams.get(`model`)
  const year = searchParams.get(`year`)
  const price = searchParams.get(`price`)
  const fuel = searchParams.get(`fuel`)
  const transmission = searchParams.get(`transmission`)

  useEffect(() => {
    const filteredMake = items?.filter(item => item.make == make);
    const filteredModel = items?.filter(item => item.model == model);
    const filteredFuel = items?.filter(item => item.fuel == fuel);
    const filteredTransmission = items?.filter(item => item.transmission == transmission);
    const filteredYear = items?.filter(item => Number(item.year) >= Number(year));
    const filteredPrice = items?.filter(item => Number(item.price) <= Number(price));
    make ? setFilteredItems(filteredMake) : ''
    model ? setFilteredItems(filteredModel) : ""
    fuel ? setFilteredItems(filteredFuel) : ""
    transmission ? setFilteredItems(filteredTransmission) : ""
    year ? setFilteredItems(filteredYear) : ""
    price ? setFilteredItems(filteredPrice) : ""
  }, [items]);

  if(filteredItems.length < 0) {
    return (
      <div>
        <p>No items found</p>
      </div>
    )
  }

  const [selectedSlug, setSelectedSlug] = useState("")
  const [selectedSlugEdit, setSelectedSlugEdit] = useState("")

    // open the specific listing's page
  const handleOnClick = (slug: string) => {
    setSelectedSlug(slug)
    const queryParams = new URLSearchParams('=');
    queryParams.append('slug', selectedSlug);

    router.push(`/listings/${selectedSlug}`);
  };  

    // redirect to edit form
  const handleOnClickEdit = (slug: string) => {
    setSelectedSlugEdit(slug);
  };
  
  useEffect(() => {
    if (selectedSlug !== '') {
      router.push(`/listings/${selectedSlug}`);
    }
    if (selectedSlugEdit !== '') {
      router.push(`/listings/${selectedSlugEdit}/edit`);
    }
  }, [selectedSlug, selectedSlugEdit]);  

  if(profile == true) {
    return (
    <>
    <div className="flex flex-row flex-wrap	max-w-6xl mx-auto mb-20">
    {items?.map((item) => (
      <div 
      key={item.id}
       className="cursor-pointer mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-british-green-1 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
        <img className="h-48 w-full object-cover object-center" src="https://images.unsplash.com/photo-1599076311391-28adf17fade5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Product Image" />
        <div className="p-4">
          <h2 
          onClick={() => handleOnClick(item.slug)} 
          className="mb-2 text-lg font-medium dark:text-white text-gray-900">{item.title}</h2>
          <h3 className="mb-2 text-md font-medium dark:text-white text-gray-900">{item.year}, {item.fuel}, {item.mileage}</h3>
          <p className="mb-2 text-base dark:text-gray-300 text-gray-700">{item.body}</p>
          <div className="flex items-center">
            <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">€{item.price}</p>
            <button onClick={() => handleOnClickEdit(item.slug)}  className="ml-2 px-2 py-2 border-2 bg-white border-red-950">Edit</button>
          </div>
        </div>
      </div>
    ))}
    </div>
    </>
    )
    }

  if(filteredItems.length == 0) {
  return (
  <>
  <div className="flex flex-row flex-wrap	max-w-6xl mx-auto mb-20">
  {items?.map((item) => (
    <div 
    // onClick={async () => (await setSelectedSlug(item.slug), handleOnClick())} 
    key={item.id} className="cursor-pointer mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-british-green-1 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
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

  return (
  <>
  <div className="flex flex-row">
  {filteredItems?.map((item) => (
    <div 
    // onClick={async () => (await setSelectedSlug(item.slug), await handleOnClick())}
     key={item.id} className="cursor-pointer mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-british-green-1 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
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