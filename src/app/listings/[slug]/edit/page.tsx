import getListingBySlug from "@/app/actions/getListingBySlug"
import ListingCreate from "../../components/ListingCreate"

interface Params {
    slug: string
}

export const EditListing = async ({ params }: { params: Params }) => {

    const listingOptions = getListingBySlug(params.slug)

    return (
        <div>
            {/* <ListingCreate options={listingOptions}/> */}
        </div>
    )
}

export default EditListing