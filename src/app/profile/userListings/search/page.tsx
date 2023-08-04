import ListingsList from '@/app/listings/components/ListingsList';
import prisma from '../../../libs/prismadb'
import { redirect } from 'next/navigation';
import InputField from '../../../../../components/inputField';

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
        <form action={searchUserListings}>
            {/* <InputField placeholder="User email.." name="searchQuery"/> */}
            <input 
            className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-text focus:outline-none focus:ring-1 focus:ring-british-green-0 focus:border-british-green-0 sm:text-sm"
            placeholder="User email.." 
            name="searchQuery" />
            <button type="submit">Submit</button>
        </form>
        <ListingsList initialItems={listings} profile={true}/>
        </>
    )  
}

export default SearchPage