import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function POST(
    request: Request
    )    {
        try {
        const body = await request.json()

        const { email, username, password, confirmPassword} = body;

        if (!email || !username || !password || !confirmPassword ) {
            return new NextResponse('Missing credentials', { status: 400})
        }

        if (password !== confirmPassword) {
            return new NextResponse('The password confirmation does not match', { status: 400})
        }

        if (password.length || confirmPassword.length > 6) {
            
        }

        if (body.password === confirmPassword) {
            const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma?.user.create({
            data: {
                email,
                username,
                hashedPassword
            }
        })
    
    return NextResponse.json(user)
    // res.status(200).json(user)
    
    }} catch (error) {
        console.log(error)
        return NextResponse.error
    }
}