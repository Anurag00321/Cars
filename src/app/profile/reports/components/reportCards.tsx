'use client'

import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '@heroicons/react/24/solid'
import { Listing } from '@prisma/client';
import { createContext, useEffect, useState } from 'react' 
import { useRouter } from 'next/navigation';


function classNames(...className: any) {
  return className.filter(Boolean).join(' ')
}

interface ReportCardsProps {
    initialItems: Listing[];
    totalListings: number;
    totalUsers: number;
    popularMake: any;
    queryData?: any;
}


export const ReportCards: React.FC<ReportCardsProps>  = ({initialItems, totalListings, totalUsers, popularMake, queryData}) => {
  

  const [items, setItems] = useState(initialItems)
  const [listingsCount, setListingsCount] = useState(totalListings)
  const [usersCount, setUsersCount] = useState(totalUsers)
  const [topMake, setTopMake] = useState(popularMake)

  // console.log(dateItems)

  const item = initialItems[0]

  const stats = [
      { name: 'Total listings', stat: `${listingsCount}`, previousStat: '70,946', change: '12%', changeType: 'increase' },
      { name: 'Total users', stat: `${usersCount}`, previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
      { name: 'Top Make', stat: `${topMake}`, previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
      // { name: 'Listings created', stat: `${dateItems}`, previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
  ]

    return (
      <div className="w-3xl">
      {queryData ? <h3 className="text-lg leading-6 font-medium text-gray-900">Last {+queryData} days</h3>:
      <h3 className="text-lg leading-6 font-medium text-gray-900">Since start</h3>
      }
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-orange-1">
                {item.stat}
                {/* <span className="ml-2 text-sm font-medium text-gray-500">from {item.previousStat}</span> */}
              </div>

              {/* <div
                className={classNames(
                  item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                  'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowSmallUpIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmallDownIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {item.change}
              </div> */}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default ReportCards