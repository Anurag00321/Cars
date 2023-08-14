import getListings from "../actions/getListings";
import getListingsCount from "../actions/getListingsCount";
import ListingsList from "./components/ListingsList"
import prisma from '../libs/prismadb'
import Pagination from "../../../components/pagination";
import ListingCard from "./components/ListingCard";
import { Listing } from "@prisma/client";

interface ListingsProps {
    searchParams: { page: string, make: string, model: string, 
        year: string, price: string, fuel: string, transmission: string}
}

export const Listings: React.FC<ListingsProps> = async ({searchParams: 
    { page, make: makeParam, model: modelParam, year: yearParam, price: priceParam, fuel: fuelParam, transmission: transParam
    }}) => {

    const pageSize = 6

    const currentPage = parseInt(page)

    const listings = await getListings();
    // const listingCount = await getListingsCount()
    
    const filterData = async () => {
        
        const skipCount = await (currentPage - 1) * pageSize
        
        const priceNum = parseInt(priceParam)

        const totalCount = await prisma.listing.findMany({
            skip: skipCount,
            take: pageSize,
            orderBy: { price: 'asc'},
            where: {
                ...(makeParam && { make: { equals: makeParam } }),
                ...(modelParam && { model: { equals: modelParam } }),
                ...(yearParam && { year: { lte: yearParam } }),
                ...(priceParam && { price: { lte: parseInt(priceParam) } }),
                ...(fuelParam && { fuel: { equals: fuelParam } }),
                ...(transParam && { transmission: { equals: transParam } }),
            },
        });

        return totalCount
    }

    const listingCount = await prisma.listing.count({
        where: {
            ...(makeParam && { make: { equals: makeParam } }),
            ...(modelParam && { model: { equals: modelParam } }),
            ...(yearParam && { year: { lte: yearParam } }),
            ...(priceParam && { price: { lte: parseInt(priceParam) } }),
            ...(fuelParam && { fuel: { equals: fuelParam } }),
            ...(transParam && { transmission: { equals: transParam } }),
        },
    })
            
    const filteredListings: Listing[] = await filterData()

    const totalPages = Math.ceil(listingCount / pageSize)

    const allParams = [makeParam, modelParam, yearParam, priceParam, fuelParam, transParam]

    const checkFilters = () => {
        if (allParams.length > 0) {
            return true
        } else {
            return false
        }
    }

    const filters = checkFilters()

    return (
        <div className="flex flex-col">
            {/* <ListingsList initialItems={listings}
            filteredListings={filteredListings}
            // total={totalCount} 
            searchParams={{page: '1'}}
            /> */}
            <ListingCard listing={await filteredListings} anyFilters={filters}/>
            <div className="flex-2">
            <Pagination currentPage={currentPage} totalPages={totalPages}/>
            </div>
        </div>
    )

}

export default Listings