import getListings from "@/app/actions/getListings";
import getCurrentUser from "../../actions/getCurrentUser";
import getUserListings from "../../actions/getUserListings";
import ListingsList from "../../listings/components/ListingsList";
import { redirect, useSearchParams } from "next/navigation";
import ProfileButtons from "../dashboard/components/profileButtons";
import getUserListingsAdmin from "@/app/actions/getUserEmail";

export const Profile = async () => {
    
    const listings = await getListings()
    // const userListings = await getUserListingsAdmin('vancelotkata@gmail.com')

    const searchUserListings = async (formData: FormData) => {
        "use server"
    
        const searchQuery = formData.get("searchQuery"?.toString())
        
        if (searchQuery) {
          redirect("/profile/userListings/search?query=" + searchQuery)
        }
      };
    

    return (
        <div>
        {/* <ProfileButtons initialListingsOpen={true} initialReportOpen={false}/> */}
      <form 
      action={searchUserListings}
      >
      <input placeholder="User email.." name="searchQuery"></input>
      </form>
        <ListingsList initialItems={listings} profile={true}/>
        </div>
    )
};

export default Profile