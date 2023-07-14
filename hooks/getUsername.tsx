// import { PrismaClient } from "@prisma/client"
// import { useSession } from "next-auth/react";
// import { User } from "@prisma/client";

// const prisma = new PrismaClient()

// export const getUsername = async () => {
//     const { data: session, status } = useSession()
//     const sessionEmail = session?.user?.email as string
  
//     if(status == 'authenticated') {
//       const user = await prisma.user.findUnique({
//         where: {
//             email: sessionEmail
//         },
//         select: {
//           name: true
//         }
//       })
//       const username = user?.name
    
//     return (
//         <p>{username}</p>
//     )

// }}

// export default getUsername
