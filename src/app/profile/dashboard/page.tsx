import getListings from "@/app/actions/getListings";
import getCurrentUser from "../../actions/getCurrentUser";
import getUserListings from "../../actions/getUserListings";
import ListingsList from "../../listings/components/ListingsList";
import ProfileButtons from "./components/profileButtons";
import { useSearchParams } from "next/navigation";

export const Profile = async () => {
    
    const listings = await getListings()
    // const searchParams = useSearchParams()

    // const params = searchParams.get(`dashboard`)

    return (
        <div>
        <ProfileButtons initialListingsOpen={true} initialReportOpen={false}/>
        <ListingsList initialItems={listings} profile={true}/>
        </div>
    )
};

export default Profile