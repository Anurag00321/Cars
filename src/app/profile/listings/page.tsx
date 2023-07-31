import getCurrentUser from "../../actions/getCurrentUser";
import getUserListings from "../../actions/getUserListings";
import ListingsList from "../../listings/components/ListingsList";

export const Profile = async () => {
    
    const currentUserListings = await getUserListings()

    return (
        <div>
        <ListingsList initialItems={currentUserListings} profile={true}/>
        </div>
    )
};

export default Profile