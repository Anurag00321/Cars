import getListings from "@/app/actions/getListings";
import getCurrentUser from "../../actions/getCurrentUser";
import getUserListings from "../../actions/getUserListings";
import ListingsList from "../../listings/components/ListingsList";
import { useSearchParams } from "next/navigation";
import ProfileButtons from "../dashboard/components/profileButtons";

export const Profile = async () => {
    
    const listings = await getListings()

    return (
        <div>
        {/* <ProfileButtons initialListingsOpen={true} initialReportOpen={false}/> */}
        <ListingsList initialItems={listings} profile={true}/>
        </div>
    )
};

export default Profile