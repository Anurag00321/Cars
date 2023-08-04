import ListingsList from '@/app/listings/components/ListingsList';
import prisma from '../../../libs/prismadb'
import { redirect } from 'next/navigation';

interface SearchPageProps {
    searchParams: { query: string }
}

// export default async function SearchPage({searchParams: {query}}: SearchPageProps) {

export const SearchPage: React.FC<SearchPageProps> = async ({searchParams: {query}}) => {
    
    const user = await prisma.user.findUnique({
        where: {
            email: query as string
        },
        select: {
          id: true
        }
      })

    const userId = user?.id
    
    const listings = await prisma.listing.findMany({
            where: {
                userId: {
                    equals: userId
                }
            },
        });
    
        const searchUserListings = async (formData: FormData) => {
            "use server"
        
            const searchQuery = formData.get("searchQuery"?.toString())
            
            if (searchQuery) {
              redirect("/profile/userListings/search?query=" + searchQuery)
            }
          };
    
    
    return (
        <>
              <form 
      action={searchUserListings}
      >
      <input placeholder="User email.." name="searchQuery"></input>
      <button type="submit">Submit</button>
      </form>
        <ListingsList initialItems={listings} profile={true}/>
        </>
    )  
}

export default SearchPage