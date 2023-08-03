import getListings from "@/app/actions/getListings";
import ReportCards from "./components/reportCards";
import getListingsCount from "@/app/actions/getListingsCount";
import getUsersCount from "@/app/actions/getUsersCount";
import GetPopularMake from "@/app/actions/getPopularMake";
// import GetDateFilter from "@/app/actions/getDateFilter";
import { useContext } from "react";
import { createServerContext } from 'react';
import { headers } from 'next/headers';
import { useSearchParams } from "next/navigation";

export const Reports = async () => {
    
    const listings = await getListings()
    const totalListings = await getListingsCount()
    const totalUsers = await getUsersCount()
    const popularMake = await GetPopularMake()
    // const getDate = await GetDateFilter()
    
    return (
        <div>
            <div className="flex items-center justify-center max-w-3xl mx-auto my-20 h-full">
            <ReportCards 
                initialItems={listings} 
                totalListings={totalListings}
                totalUsers={totalUsers}
                popularMake={popularMake}
            />  
            </div>
        </div>
    )
};

export default Reports