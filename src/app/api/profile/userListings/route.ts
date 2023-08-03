import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import getCurrentUser from "@/app/actions/getCurrentUser";

const prisma = new PrismaClient()

export async function GET(
    request: Request,
  ) {
    try {
        // const body = await request.json();
        // const {
        //     email
        // } = body;
        
        const url = new URL(await request.url)

        const email= url.searchParams.get("email")

        if(!email) {
            console.log('no email data')
            return new NextResponse('No email data found.', { status: 400 });

        }

        if(email == null) {
            console.log('no email data')
            return new NextResponse('No email data found.', { status: 400 });

        }

        const getUserListingsAdmin = async (email: any) => {

            // const { email } = Object.fromEntries(emailData)
        
            if(!email) {
                console.log('No email data found.')
                return new NextResponse('No email data found.', { status: 400 });
                
            }

            if(email == null) {
                console.log('no email data')
                return new NextResponse('No email data found.', { status: 400 });
            }    
                
            const user = await prisma.user.findUnique({
                where: {
                    email: email as string
                },
                select: {
                  id: true
                }
              })
        
            const userId = user?.id
            
            try {
                const listings = await prisma.listing.findMany({
                    where: {
                        userId: {
                            equals: userId
                        }
                    },
                });
                
                console.log('listings', listings)
                

                return NextResponse.json(listings)
                return listings;
            } catch (error: any) {
                console.log('There was an error', error)
                return NextResponse.json([])
                return [];
            }
        }
    
    const getUserEmailData = async () => {

    const userData = await getUserListingsAdmin(email)

    console.log('userData', userData)

    // return userData


    console.log('userData:', userData)
    // console.log('nextresp:',NextResponse.json(listing))
    return NextResponse.json(userData)
    }
    } catch (error) {
        console.log(error)
        return new NextResponse('Error', { status: 500 });
    }};