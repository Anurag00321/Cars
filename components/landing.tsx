'use client'

import landingPhoto from 'src/app/landingPhoto.jpg'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { User } from '@prisma/client';
import { useSession, signOut } from "next-auth/react";
import { useEffect } from 'react';

interface LandingProps {
    currentUser: User
}  

export const Landing: React.FC<LandingProps> = ({currentUser}) => {
    
    const router = useRouter();
    const { data: session, status: status } = useSession()

    useEffect(() => {
        router.prefetch('/listings/create');
        router.prefetch('/signin')
        router.prefetch('/listings')
    }, [router])

    const handleCreateOnClick = () => {
        if(status === 'authenticated') {
            router.push('/listings/create')
        } else {
            router.push('/signin')
        }
    }

    return (
        <>
        <div className="flex items-center justify-center font-rubik">
        <Image src={landingPhoto} 
        // unoptimized={true} priority 
        alt="Landing Photo" 
        className="brightness-[0.6] relative w-full sm:max-h-[32rem] object-cover opacity-85 shadow-md"/>
            <div className='absolute text-white max-w-5xl mx-auto'>
            <p className="mt-2 text-lg sm:text-2xl font-medium px-6 xl:px-0">Lorem ipsum dolor sit amet consectetur</p>
            <p className="mt-4 text-md sm:text-lg font-thin px-6 xl:px-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel veritatis ratione labore, exercitationem, incidunt omnis deserunt perspiciatis dolores recusandae necessitatibus provident sed accusamus non optio tenetur id! Laboriosam, facere eos?</p>
                <div className="flex justify-center items-center pb-12 lg:pb-0 px-6 xl:px-0 sm:block">
                    <button 
                    onClick={handleCreateOnClick}
                    className="text-white mt-8 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-6 py-4 text-center sm:mr-4 border border-white bg-transperant hover:bg-british-green-2 dark:focus:ring-british-green-0"
                    >Add a listing</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Landing