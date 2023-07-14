
import SelectMenu from "../../../components/selectMenu";
import getListings from "../actions/getListings";
import ListingsFilter from "./components/ListingsFilter";
import ListingsList from "./components/ListingsList"

export const Listings = async () => {

    const listings = await getListings();
    // console.log(listings)

    return (
        <div>
            <ListingsList initialItems={listings} />
            <ListingsFilter initialItems={listings}/>
            {/* <SelectMenu data={listings} field="model"/>
            <SelectMenu data={listings} field="title"/> */}
        </div>
    )
}

export default Listings