'use client'
import { Listing } from "@prisma/client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ListingCardProps {
    listing: Listing[]
}

export const ListingCard: React.FC<ListingCardProps> = ({listing}) => {

    const router = useRouter();

    const [selectedSlug, setSelectedSlug] = useState("")

    console.log(selectedSlug)

    // const [item, setItem] = useState(listing || [])


    useEffect (() => {
            const queryParams = new URLSearchParams('=');
            queryParams.append('slug', selectedSlug);
            
            if(selectedSlug.length > 0) {
            router.push(`/listings/${selectedSlug}`);
            } else {
                setSelectedSlug(selectedSlug)
            }
    }, [selectedSlug])

      return (
        <>
        <div className="flex flex-row flex-wrap	max-w-6xl mx-auto mb-20">
        {listing?.map((item) => (
          <div 
          onClick={() => setSelectedSlug(item.slug)}
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
      
    // return (
    //     <>
    //     <div className="flex flex-row flex-wrap	max-w-6xl mx-auto mb-20">
    //       <div 
    //       onClick={() => handleOnClick(listing.slug)} 
    //       key={listing.id} className="cursor-pointer mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-british-green-1 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
    //         <img className="h-48 w-full object-cover object-center" src="https://images.unsplash.com/photo-1599076311391-28adf17fade5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Product Image" />
    //         <div className="p-4">
    //           <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{listing.title}</h2>
    //           <h3 className="mb-2 text-md font-medium dark:text-white text-gray-900">{listing.year}, {listing.fuel}, {listing.mileage}</h3>
    //           <p className="mb-2 text-base dark:text-gray-300 text-gray-700">{listing.body}</p>
    //           <div className="flex items-center">
    //             <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">€{listing.price}</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     </>
    //     )      
}

export default ListingCard