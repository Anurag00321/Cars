import getListingBySlug from "@/app/actions/getListingBySlug"
import ListingEditForm from "./components/ListingEditForm"
// import ListingCreate from "../../components/ListingCreate"

interface Params {
    slug: string
}

export const EditListing = async ({ params }: { params: Params }) => {

    const listingOptions = await getListingBySlug(params.slug)

    return (
        <div>
            <ListingEditForm initialItems={listingOptions as any}/>
            {/* <ListingCreate options={listingOptions}/> */}
        </div>
    )
}

export default EditListing