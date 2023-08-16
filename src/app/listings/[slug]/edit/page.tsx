import getListingBySlug from "@/app/actions/getListingBySlug"
import ListingEditForm from "./components/ListingEditForm"
import { Suspense } from "react"
import LoadingComponent from "@/app//listings/[slug]/edit/loading"

interface EditListingsProps {
    searchParams: { slug: string },
    params: any
}

export const Edit: React.FC<EditListingsProps> = async ({searchParams: {slug}}) => {

    const listingOptions = await getListingBySlug(slug)

    return (
        <div>
            <Suspense fallback={<LoadingComponent />}>
                <ListingEditForm initialItems={listingOptions as any}/>
            </Suspense>
        </div>
    )
}

export default Edit