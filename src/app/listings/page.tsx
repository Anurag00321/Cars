import SelectMenu from "../../../components/selectMenu";
// import { getUserEmailData } from "../actions/_actions";
import getListings from "../actions/getListings";
import getListingsCount from "../actions/getListingsCount";
import getUserListingsAdmin from "../actions/getUserEmail";
import ListingsFilter from "./components/ListingsFilter";
// import ListingsFilterSidebar from "./components/ListingsFilterSidebar";
import ListingsList from "./components/ListingsList"
import prisma from '../libs/prismadb'
import Pagination from "../../../components/pagination";
import getListingsPagination from "../actions/getListingsPagination";

interface ListingsProps {
    searchParams: { page: string, make: string, model: string, 
        year: string, price: string, fuel: string, transmission: string}
}

export const Listings: React.FC<ListingsProps> = async ({searchParams: { page, make: makeParam, model, year, price, fuel, transmission }}) => {

    const pageSize = 6

    const currentPage = parseInt(page)

    const listings = await getListings();
    const listingCount = await getListingsCount()
    
    // const filterData = await listings?.filter((item) => {
    //     // const isMakeMatch = !make || item.make === make;
    //     // const isModelMatch = !model || item.model === model;
    //     // const isFuelMatch = !fuel || item.fuel === fuel;
    //     // const isTransmissionMatch = !transmission || item.transmission === transmission;
    //     // const isYearMatch = !year || Number(item.year) >= Number(year);
    //     // const isPriceMatch = !price || Number(item.price) <= Number(price);
    
    //     // return isMakeMatch && isModelMatch && isFuelMatch && isTransmissionMatch && isYearMatch && isPriceMatch;
        
    //     // const getSearchFilters = async () => {
    //         //     "use server"

    //         //     const make = searchParams.get(`make`)
    //         //     const model = searchParams.get(`model`)
    //         //     const year = searchParams.get(`year`)
    //         //     const price = searchParams.get(`price`)
    //         //     const fuel = searchParams.get(`fuel`)
    //         //     const transmission = searchParams.get(`transmission`)
            
    //         // }
            
    //         // const listingsTotal = await getListingsPagination(currentPage, pageSize)
            
    //         // const totalListings = await getListingsCount()
            
    //         const skipCount = (currentPage - 1) * pageSize
            
    //         // const totalCount = await prisma.listing.findMany({
    //         const totalCount =  prisma.listing.findMany({
    //             where: {
    //                 make: make,
    //                 model: model,
    //                 year: {
    //                     lte: year
    //                 },
    //                 price: {
    //                     gte: price
    //                 },
    //                 fuel: fuel,
    //                 transmission: transmission
    //             },
    //             orderBy: { id: 'desc'},
    //             // skip: (currentPage - 1) * pageSize,
    //             skip: skipCount,
    //             take: pageSize
    //         });
    //     })

    const filterData = async () => {
        // const isMakeMatch = !make || item.make === make;
        // const isModelMatch = !model || item.model === model;
        // const isFuelMatch = !fuel || item.fuel === fuel;
        // const isTransmissionMatch = !transmission || item.transmission === transmission;
        // const isYearMatch = !year || Number(item.year) >= Number(year);
        // const isPriceMatch = !price || Number(item.price) <= Number(price);
    
        // return isMakeMatch && isModelMatch && isFuelMatch && isTransmissionMatch && isYearMatch && isPriceMatch;
        
        // const getSearchFilters = async () => {
            //     "use server"

            //     const make = searchParams.get(`make`)
            //     const model = searchParams.get(`model`)
            //     const year = searchParams.get(`year`)
            //     const price = searchParams.get(`price`)
            //     const fuel = searchParams.get(`fuel`)
            //     const transmission = searchParams.get(`transmission`)
            
            // }
            
            // const listingsTotal = await getListingsPagination(currentPage, pageSize)
            
            // const totalListings = await getListingsCount()
            
            const skipCount = (currentPage - 1) * pageSize
            
            // const totalCount = await prisma.listing.findMany({
            const totalCount =  await prisma.listing.findMany({
                // where: {
                //     make: makeParam && makeParam ,
                //     model: model ? model : undefined,
                //     year: {
                //         lte: year ? year : undefined
                //     },
                //     price: {
                //         gte: price ? price : undefined
                //     },
                //     fuel: fuel ? fuel : undefined,
                //     transmission: transmission ? transmission : undefined
                // },
                where: {
                    ...(makeParam && { make: { equals: makeParam } }),
                    ...(model && { model: { equals: model } }),
                    ...(year && { year: { lte: year } }),
                    ...(price && { price: { gte: price } }),
                    ...(fuel && { fuel: { equals: fuel } }),
                    ...(transmission && { transmission: { equals: transmission } }),
                },
                orderBy: { id: 'desc'},
                // skip: (currentPage - 1) * pageSize,
                skip: skipCount,
                take: pageSize
            });

            // console.log('totalCount',totalCount)
            return totalCount
        }
            
        const filteredListings = await filterData()

        // console.log('filteredListings',filteredListings)


            const totalPages = Math.ceil(listingCount / pageSize)
            
    // console.log(totalCount)
    
    return (
        <div className="flex flex-col">
            <ListingsList initialItems={listings}
            filteredListings={filteredListings}
            // total={totalCount} 
            searchParams={{page: '1'}}
            />
            <div className="flex-2">
            <Pagination currentPage={currentPage} totalPages={totalPages}/>
            </div>
        </div>
    )

}

export default Listings