import getListingBySlug from "@/app/actions/getListingBySlug"
import ListingsList from "../components/ListingsList"
import ListingPage from "./components/ListingPage"
import getEmailBySlug from "@/app/actions/getEmailBySlug"
import { Suspense } from "react"
import LoadingComponent from "@/app//listings/[slug]/loading"

interface Params {
    slug: string
}

export default async function Page({
    params,
  }: {
    params: Params;
  }): Promise<JSX.Element | null> {

    const slugParam = params.slug

    console.log('slug page slug:', params.slug)

    let listing = null;
    let userEmail = null;

    console.log('slug page slug:', params.slug);

    listing = await getListingBySlug(slugParam);
    userEmail = await getEmailBySlug(slugParam);
    try {
        listing = await getListingBySlug(slugParam);
        userEmail = await getEmailBySlug(slugParam);

        if (!listing) {
            console.log('no listing');
        }

        if (!userEmail) {
            console.log('no user Email');
        }

        // Rest of your code...

    } catch (error) {
        console.log('Error:', error);
    }

    return (
      <div className="pt-[64px] md:pt-0">
          <Suspense fallback={<LoadingComponent />}>
            <ListingPage initialItems={listing as any} listingEmail={userEmail}/>
          </Suspense>
        </div>
    )
}