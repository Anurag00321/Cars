import getListingBySlug from "@/app/actions/getListingBySlug"
import SlugListingComp from "./components/SlugListing"
import ListingsList from "../components/ListingsList"
import ListingPage from "../components/ListingPage"

interface Params {
    slug: string
}

export const SlugListing = async ({ params }: { params: Params }) => {

    const listing = await getListingBySlug(params.slug)

    if(!listing) {
        console.log('no listing')
    }

    return (
        <div>
            <ListingPage initialItems={listing as any} />
        </div>
    )
}

export default SlugListing
