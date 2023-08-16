import getListingBySlug from "@/app/actions/getListingBySlug"
import SlugListingComp from "./components/SlugListing"
import ListingsList from "../components/ListingsList"
import ListingPage from "./components/ListingPage"
import getEmailBySlug from "@/app/actions/getEmailBySlug"
import { Suspense } from "react"
import LoadingComponent from "@/app//listings/[slug]/loading"

interface Params {
    slug: string
}

export const SlugListing = async ({ params }: { params: Params }) => {

    const listing = await getListingBySlug(params.slug)
    const userEmail = await getEmailBySlug(params.slug)

    if(!listing) {
        console.log('no listing')
    }

    if(!userEmail) {
        console.log('no user Email')
    }

    return (
        <div>
          <Suspense fallback={<LoadingComponent />}>
            <ListingPage initialItems={listing as any} listingEmail={userEmail}/>
          </Suspense>
        </div>
    )
}

export default SlugListing