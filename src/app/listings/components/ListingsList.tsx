'use client';

import { Listing } from "@prisma/client";
import { useState } from 'react';

interface ListingsListProps {
    initialItems: Listing[];
}

const ListingsList: React.FC<ListingsListProps> = ({initialItems}) => {

    const [items, setItems] = useState(initialItems)

    return (
    <>
    <div className="flex flex-row">
    {items.map((item) => (
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