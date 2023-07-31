import getListings from "@/app/actions/getListings";
import ReportCards from "./components/reportCards";
import getListingsCount from "@/app/actions/getListingsCount";


export const Reports = async () => {
    
    const listings = await getListings()
    const totalListings = await getListingsCount()
    
    return (
        <div>
            <div className="flex items-center justify-center max-w-3xl mx-auto my-20 h-full">
            <ReportCards initialItems={listings} totalListings={totalListings}/>
            </div>
        </div>
    )
};

export default Reports