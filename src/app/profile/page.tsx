import getCurrentUser from "../actions/getCurrentUser";
import getUserListings from "../actions/getUserListings";
import ListingsList from "../listings/components/ListingsList";

export const Profile = async () => {
    
    const currentUserListings = await getUserListings()

    return (
        <div>
        <button className="border bg-british-green-4">
            My listings
        </button>
        <ListingsList initialItems={currentUserListings} />
        </div>
    )
};

export default Profile