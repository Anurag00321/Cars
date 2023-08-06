'use client';

import { Listing } from "@prisma/client";
import { useContext, useState, useEffect, useCallback } from 'react';
import { ListingsFilter, FilterContext } from "./ListingsFilter";
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import getListingBySlug from "@/app/actions/getListingBySlug";
import InputField from "../../../../components/inputField";
// import { getUserEmailData } from "@/app/actions/_actions";
import getUserListingsAdmin from "@/app/actions/getUserEmail";
import axios from "axios";
import Link from "next/link";
import Pagination from "../../../../components/pagination";
// import { searchUserListings } from "@/app/actions/_actions";

interface ListingsListProps {
    initialItems: Listing[];
    updatedItems?: Listing[];
    profile?: boolean;
    featured?: boolean;
    searchParams: { page: string}
    total?: Listing[]
    filteredListings: Listing[]
}

const ListingsList: React.FC<ListingsListProps> = ({initialItems, profile, updatedItems, featured, searchParams: { page }, total, filteredListings}) => {

  const currentPage = parseInt(page)

  const pageSize = 6

  const totalItemCount = total

  const itemsTest = useContext(FilterContext)

  // const totalPages = Math.ceil(totalItemCount / pageSize)

  const [items, setItems] = useState(initialItems)
  const [totalItems, setTotalItems] = useState(total || [])
  const [updatedItemsState, setUpdatedItemsState] = useState(updatedItems)
  
  const initialFilters = useContext(FilterContext)

  const [filteredState, setFilteredState] = useState(initialFilters || [])

  const [filteredItems, setFilteredItems] = useState(filteredState || []);

  const [filteredPagination, setFilteredPagination] = useState(filteredListings || []);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()

  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const make = searchParams.get(`make`)
  const model = searchParams.get(`model`)
  const year = searchParams.get(`year`)
  const price = searchParams.get(`price`)
  const fuel = searchParams.get(`fuel`)
  const transmission = searchParams.get(`transmission`)

  useEffect(() => {
    const filterData = items?.filter((item) => {
      const isMakeMatch = !make || item.make === make;
      const isModelMatch = !model || item.model === model;
      const isFuelMatch = !fuel || item.fuel === fuel;
      const isTransmissionMatch = !transmission || item.transmission === transmission;
      const isYearMatch = !year || Number(item.year) >= Number(year);
      const isPriceMatch = !price || Number(item.price) <= Number(price);
  
      return isMakeMatch && isModelMatch && isFuelMatch && isTransmissionMatch && isYearMatch && isPriceMatch;
    });
    if(totalItems) {
    if(totalItems?.length > 0) {
      setTotalItems(filterData)
    }} else {
    setFilteredItems(filterData);
    }
  }, [items, make, model, fuel, transmission, year, price]);  

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
  
  const [slug, setSlug] = useState('')

  const handleDelete = async (slug: string) => {
    setSlug(slug)
    await axios.delete('/api/listings/delete', {
      data: { slug }
    }).then((callback) => {
      if (callback.data.error) {
        console.log('Error while trying to delete listing:', callback)
      }
      else if (callback) {
        console.log('done', callback)
        // router.push('/')
      }
    })
    .finally(() => console.log('Listing deleted successfully!'))
  }

  useEffect(() => {
    if (selectedSlug !== '') {
      router.push(`/listings/${selectedSlug}`);
    }
    if (selectedSlugEdit !== '') {
      router.push(`/listings/${selectedSlugEdit}/edit`);
    }
  }, [selectedSlug, selectedSlugEdit, filteredItems]);  

    

    if(profile == true) {
      return (
      <>
      <div className="flex flex-row flex-wrap	max-w-6xl mx-auto mb-20">
      {items?.map((item) => (
        <div 
        key={item.id}
        className="cursor-pointer mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-british-green-1 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
          {item.photos.length > 0 ? <img className="h-48 w-full object-cover object-center" src={item.photos[0]} alt="Product Image" />
          : 
          <img className="h-48 w-full object-cover object-center" src="https://images.unsplash.com/photo-1599076311391-28adf17fade5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Product Image" />
           }
          <div className="p-4">
            <h2 
            onClick={() => handleOnClick(item.slug)} 
            className="mb-2 text-lg font-medium dark:text-white text-gray-900">{item.title}</h2>
            <h3 className="mb-2 text-md font-medium dark:text-white text-gray-900">{item.year}, {item.fuel}, {item.mileage}</h3>
            <p className="mb-2 text-base dark:text-gray-300 text-gray-700">{item.body}</p>
            <div className="flex items-center justify-between">
              <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white justify-items-end ">€{item.price}</p>
              <div className="flex">
              <button onClick={() => handleOnClickEdit(item.slug)}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 md:mr-2 dark:bg-light-green dark:hover:bg-british-green-4 dark:focus:ring-british-green-2">Edit</button>
              <button onClick={() => handleDelete(item.slug)}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 md:mr-2 dark:bg-light-green dark:hover:bg-british-green-4 dark:focus:ring-british-green-2">X</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
      </>
      )
    
  }

  if(featured === true) {
  return (
  <>
  <div className="relative flex flex-row flex-wrap	max-w-6xl mx-auto mb-20">
  {items.slice(-3)?.map((item) => (
    <div 
    onClick={() => handleOnClick(item.slug)} 
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

  if(filteredItems.length == 0) {
  return (
  <>
  <div className="flex flex-row flex-wrap	max-w-6xl mx-auto mb-20">
  {filteredPagination?.map((item) => (
    <div 
    onClick={() => handleOnClick(item.slug)} 
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

  if(filteredItems.length > 0) {
  return (
  <>
      <div className="flex flex-row flex-wrap	max-w-6xl mx-auto mb-20">
        
  {totalItems?.map((item) => (
    <div 
    onClick={() => handleOnClick(item.slug)} 
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
      <p className="text-black">TEST</p>
    <div className="flex flex-row flex-wrap	max-w-6xl mx-auto mb-20">
      <p className="text-black">TEST</p>
    {totalItems?.map((item) => (
      <div 
      onClick={() => handleOnClick(item.slug)} 
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