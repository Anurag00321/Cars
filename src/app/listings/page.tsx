import SelectMenu from "../../../components/selectMenu";
// import { getUserEmailData } from "../actions/_actions";
import getListings from "../actions/getListings";
import getUserListingsAdmin from "../actions/getUserEmail";
import ListingsFilter from "./components/ListingsFilter";
import ListingsFilterSidebar from "./components/ListingsFilterSidebar";
import ListingsList from "./components/ListingsList"

export const Listings = async () => {

    const listings = await getListings();

        // test 1

    // const emailData = getUserEmailData.toString

    // console.log('emailData', emailData)

    // async function getUserEmailData(data: any) {
    //     "use server"
    //     const emailData = data
    // }

    // console.log('emailData', emailData)

    // const userData = await getUserListingsAdmin(emailData)

    // const userDataTest = userData[0]

    // console.log('userdata', userDataTest)
    

    return (
        <div className="flex flex-wrap">
            <ListingsList initialItems={listings} 
            // updatedItems={userData} 
            // getUserEmailData={getUserEmailData}
            />
            {/* <ListingsFilterSidebar initialItems={listings}/> */}
            {/* <ListingsFilter initialItems={listings} sideBar={true}/> */}
            {/* <SelectMenu data={listings} field="model"/>
            <SelectMenu data={listings} field="title"/> */}
        </div>
    )
}

export default Listings