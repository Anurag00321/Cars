'use client'

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUsername from "@/app/actions/getUsername";
// import { UserCircleIcon } from '@heroicons/react/20/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import getCurrentUser from "@/app/actions/getCurrentUser";
import { User } from "@prisma/client";
import ProfileMenu from "./profileMenu";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'

interface NavBarProps {
  currentUser: User
}

function classNames(...className: any[]) {
  return className.filter(Boolean).join(' ');
}

export const Navbar: React.FC<NavBarProps> = ({currentUser}) => {

  const { data: session, status: status } = useSession()
  const sessionEmail = session?.user?.email as string

  const router = useRouter();

  const user = currentUser
  
  const [sessionStatus, setSessionStatus] = useState(false)
  
  // const username = getUsername()
  
  const [isAdmin, setIsAdmin] = useState(false)

  const userRole = currentUser?.role
  
  useEffect(() => {
    if (status === 'authenticated') {
      setSessionStatus(true);
    }
    if(userRole === "ADMIN") {
      setIsAdmin(true)
      router.prefetch('/profile/userListings');
      router.prefetch('/profile/reports');  
    } else {
      setIsAdmin(false)
      router.prefetch("/profile/listings");
    }
  }, [status, router, sessionStatus]);

  
  const handleLogout = () => {
    signOut()
    router.push('/')
  };
  
  const navigation = [
    ...(sessionStatus ? [] : [
        { name: 'Sign up', href: '/register', current: true },
        { name: 'Login', href: '/login', current: false },
    ]),
    { name: 'Add a listing', href: '/listings/create', current: false },
  ];

//   return (
//     <nav className="z-10 relative border-gray-200 bg-british-green-1 shadow-md">
//     <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//     <a href="/" onClick={handleLogoClick} className="flex items-center">
//         {/* <img src="" className="h-8 mr-3" alt="Logo" /> */}
//         <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">flatSix</span>
//     </a>
//     <div className="flex md:order-2">
//     <button 
//           type="button"
//           onClick={() => router.push('/listings/create')}
//           className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-4 md:mr-4 border border-white bg-transperant hover:bg-british-green-2 dark:focus:ring-british-green-0"
//           >Add a listing
//           </button>
//       {!sessionStatus &&
//           <button 
//           type="button"
//           onClick={() => router.push('/register')}
//           className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-4 md:mr-4 bg-british-green-2 hover:bg-british-green-4 dark:focus:ring-british-green-0"
//           >Sign up
//           </button>
//         }
//         {!sessionStatus &&
//         <button 
//         type="button"
//         onClick={() => router.push('/signin')}
//         className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-4 md:mr-4 bg-british-green-2 hover:bg-british-green-4 dark:focus:ring-british-green-0"
//         >Login
//         </button>
//         }
//         {/* {sessionStatus &&
//           <div className="flex flex-row items-center">
//             <button onClick={handleLogout} 
//             type="button" 
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 md:mr-2 dark:bg-light-green dark:hover:bg-british-green-4 dark:focus:ring-british-green-2"
//             >Log out
//             </button>
//           </div>
//         } */}
//         {/* <div className="bg-gray-100 rounded-3xl"> */}
//         <div className="">
//         <ProfileMenu currentUser={currentUser}/>
//         </div>
//         {/* <UserCircleIcon onClick={() => router.push('/profile')} className="h-9 w-9 text-gray-300 cursor-pointer" aria-hidden="true" /> */}
//         {/* </div> */}
//         <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
//           <span className="sr-only">Open main menu</span>
//           <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
//       </button>
//     </div>
//     <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
//       <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-british-green-1 dark:border-gray-700">
//         {/* <li onClick={() => router.push('/')}>
//         <button className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-british-green-2 md:p-0 md:dark:hover:text-light-green dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</button>
//         </li>
//         <li onClick={() => router.push('/listings')}>
//         <button className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-british-green-2 md:p-0 md:dark:hover:text-light-green dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Listings</button>
//         </li> */}
//       </ul>
//     </div>
//     </div>
//   </nav>
// )};

return (
  <Disclosure as="nav" className="bg-british-green-1">
    {({ open }) => (
      <>
        <div className="z-10 relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-end">
              <div className="flex-shrink-0 flex items-center">
                <p className="block text-2xl font-semibold whitespace-nowrap dark:text-white" onClick={() => router.push('/')}>FlatSix</p>
                {/* <img
                  className="block lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="Workflow"
                /> */}
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-100 hover:bg-british-green-0 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <button
                type="button"
                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button> */}

              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="bg-british-green-2 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon className="h-9 w-9 text-gray-100 cursor-pointer" aria-hidden="true" />
                    {/* <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    /> */}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/profile/listings"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          My listings
                        </a>
                      )}
                    </Menu.Item>
                    {isAdmin &&
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/profile/userListings"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          User listings
                        </a>
                      )}
                    </Menu.Item>
                    }
                    {isAdmin &&
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/profile/reports"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Reports
                        </a>
                      )}
                    </Menu.Item>
                    }
                    {sessionStatus &&
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={handleLogout}
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Log out
                        </a>
                      )}
                    </Menu.Item>
                    }
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block px-3 py-2 rounded-md text-base font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
)}

export default Navbar