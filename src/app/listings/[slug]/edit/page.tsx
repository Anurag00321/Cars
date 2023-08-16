import getListingBySlug from "@/app/actions/getListingBySlug"
import ListingEditForm from "./components/ListingEditForm"
import { Suspense } from "react"
import LoadingComponent from "@/app//listings/[slug]/edit/loading"

interface Params {
    slug: string
}

export const EditListing = async ({ params }: { params: Params }) => {

    const listingOptions = await getListingBySlug(params.slug)

    return (
        <div>
            <Suspense fallback={<LoadingComponent />}>
                <ListingEditForm initialItems={listingOptions as any}/>
            </Suspense>
        </div>
    )
}

export default EditListing