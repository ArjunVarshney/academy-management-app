import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getAllUsers = async (
   filter: Prisma.UserWhereInput
) => {
   return await db.user.findMany({
      where: filter,
      include: {
         staff: true,
         student: true,
         teacher: true,
         admin: true,
         owner: true,
         achievements: true,
      },
      omit: {
         password: true,
      },
   });
};
