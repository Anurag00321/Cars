import prisma from "@/app/libs/prismadb";

export const getUsersCount = async () => {
  const totalCount = await prisma.user.count();
  
  return totalCount;
}

export default getUsersCount