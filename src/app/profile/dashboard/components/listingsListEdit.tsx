import getListings from "@/app/actions/getListings";
import getCurrentUser from "../../../actions/getCurrentUser";
import getUserListings from "../../../actions/getUserListings";
import ListingsList from "../../../listings/components/ListingsList";
import ProfileButtons from "../components/profileButtons";
import { useSearchParams } from "next/navigation";

export const Profile = async () => {
    
    const listings = await getListings()

    return (
        <div>
            <ListingsList initialItems={listings} profile={true}/>
        </div>
    )
};

export default Profile