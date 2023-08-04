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

interface NavBarProps {
  currentUser: User
}

export const Navbar: React.FC<NavBarProps> = ({currentUser}) => {

  const { data: session, status: status } = useSession()
  const sessionEmail = session?.user?.email as string

  const router = useRouter();

  const user = currentUser

  const userRole = currentUser?.role

  const [sessionStatus, setSessionStatus] = useState(false)
  
  // const username = getUsername()
  
  useEffect(() => {
    if (status === 'authenticated') {
      setSessionStatus(true);
    }
    if(userRole === "ADMIN") {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }  
  }, [status]);

  const [isAdmin, setIsAdmin] = useState(false)
  
  const handleLogout = () => {
    signOut()
    router.push('/')
  };
  
  return (
    <nav className="z-10 relative border-gray-200 bg-british-green-1">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" className="flex items-center">
        {/* <img src="" className="h-8 mr-3" alt="Logo" /> */}
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">flatSix</span>
    </a>
    <div className="flex md:order-2">
    <button 
          type="button"
          onClick={() => router.push('/listings/create')}
          className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-4 md:mr-4 border border-white bg-transperant hover:bg-british-green-2 dark:focus:ring-british-green-0"
          >Add a listing
          </button>
      {!sessionStatus &&
          <button 
          type="button"
          onClick={() => router.push('/register')}
          className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-4 md:mr-4 bg-british-green-2 hover:bg-british-green-4 dark:focus:ring-british-green-0"
          >Sign up
          </button>
        }
        {!sessionStatus &&
        <button 
        type="button"
        onClick={() => router.push('/signin')}
        className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-4 md:mr-4 bg-british-green-2 hover:bg-british-green-4 dark:focus:ring-british-green-0"
        >Login
        </button>
        }
        {/* {sessionStatus &&
          <div className="flex flex-row items-center">
            <button onClick={handleLogout} 
            type="button" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 md:mr-2 dark:bg-light-green dark:hover:bg-british-green-4 dark:focus:ring-british-green-2"
            >Log out
            </button>
          </div>
        } */}
        {/* <div className="bg-gray-100 rounded-3xl"> */}
        <div className="">
        <ProfileMenu currentUser={currentUser}/>
        </div>
        {/* <UserCircleIcon onClick={() => router.push('/profile')} className="h-9 w-9 text-gray-300 cursor-pointer" aria-hidden="true" /> */}
        {/* </div> */}
        <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
      </button>
    </div>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-british-green-1 dark:border-gray-700">
        {/* <li onClick={() => router.push('/')}>
        <button className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-british-green-2 md:p-0 md:dark:hover:text-light-green dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</button>
        </li>
        <li onClick={() => router.push('/listings')}>
        <button className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-british-green-2 md:p-0 md:dark:hover:text-light-green dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Listings</button>
        </li> */}
      </ul>
    </div>
    </div>
  </nav>
)};

export default Navbar