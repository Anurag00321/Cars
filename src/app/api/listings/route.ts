import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import getCurrentUser from "@/app/actions/getCurrentUser";

const prisma = new PrismaClient()

export async function POST(
    request: Request,
  ) {
    try {
        const body = await request.json();
        const {
            title,
            description,
            make,
            model,
            year,
            coupe_type,
            number_doors,
            condition,
            price,
            fuel,
            transmission,
            mileage,
            power,
            color,
            variant,
            photos,
        } = body;

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      console.log(currentUser)
      return new NextResponse(`Unauthorized -${currentUser}`, { status: 400 });
    }

    const user = await prisma.user.findUnique({
    where: {
      email: currentUser.email,
    },
    });
    
    const generateUniqueSlug = async () => {
      let slug = `${make.toLowerCase()}-${model.toLowerCase()}`;
    
      if (variant) {
        slug += `-${variant.toLowerCase()}`;
      }
    
      let id = 0;
      let isUnique = false;
    
      while (!isUnique) {
        const existingListing = await prisma.listing.findFirst({
          where: {
            slug,
          },
        });
    
        if (!existingListing) {
          isUnique = true;
        } else {
          id++;
          if (variant) {
            slug = `${make.toLowerCase()}-${model.toLowerCase()}-${variant.toLowerCase()}-${id}`;
          } else {
            slug = `${make.toLowerCase()}-${model.toLowerCase()}-${id}`;
          }
        }
      }
    
      return slug;
    };

    const slug = await generateUniqueSlug();

    const listing = await prisma.listing.create({
        data: {
            title: title,
            description: '',
            make: make,
            model: model,
            year: year,
            coupe_type: coupe_type,
            number_doors: number_doors,
            condition: condition,
            price: price,
            fuel: fuel,
            transmission: transmission,
            mileage: mileage,
            power: power,
            color: color,
            slug: slug,
            variant: variant,
            body: description,
            photos: photos,
            user: {
                connect: { id: currentUser.id },
            }
        },
        
    })

    console.log('listing created:', listing)
    // console.log('nextresp:',NextResponse.json(listing))
    return NextResponse.json(listing)
    } catch (error) {
        console.log(error)
        return new NextResponse('Error', { status: 500 });
    }};