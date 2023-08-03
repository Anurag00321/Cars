import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import getCurrentUser from "@/app/actions/getCurrentUser";

const prisma = new PrismaClient()

export async function DELETE(
    request: Request,
  ) {
    try {
        const body = await request.json();
        const {
            slug
        } = body;

    // const currentUser = await getCurrentUser();

    // if (!currentUser?.id || !currentUser?.email) {
    //   return new NextResponse('Please sign in to create a new listing.', { status: 400 });
    // };

    // if (inputFieldsError.trim().length > 0 ||
    // selectMenusError.trim().length > 0 ||
    // titleDescriptionError.trim().length > 0
    // ) {
    // return await NextResponse.json(
    //   { data: { inputField: inputFieldsError, selectMenu: selectMenusError, titleDescription: titleDescriptionError } },
    //   { status: 400 }
    // );
    // }    

    // const user = await prisma.user.findUnique({
    // where: {
    //   email: currentUser.email,
    // },
    // });

    if(!slug) {
        return new NextResponse('No slug found.', { status: 400 });
    }

    const listing = await prisma.listing.delete({
      where: {
          slug: slug
      },
    })

    console.log('listing deleted:', listing)
    // console.log('nextresp:',NextResponse.json(listing))
    return NextResponse.json({ message: NextResponse, success: false });
        } catch (error) {
        console.log(error)
        return new NextResponse('Error, the listing was not deleted', { status: 500 });
    }};