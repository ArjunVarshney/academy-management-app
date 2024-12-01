import { getAllUsers } from "@/queries/user-queries";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
   try {
      let data = await getAllUsers({});
      for (let i = 0; i < data.length; i++) {
         data[i] = {
            ...data[i],
            ...data[i][data[i].role.toLowerCase()],
            id: data[i].id,
            [data[i].role.toLowerCase()]: undefined,
         };
         for (const key in data[i]) {
            if (data[i][key] === null) {
               delete data[i][key];
            }
         }
      }
      return NextResponse.json({
         success: true,
         data: data || [],
      });
   } catch (err) {
      console.log("[Get All Users]", err);
      return NextResponse.json(
         {
            success: false,
            error: err,
         },
         { status: 500 }
      );
   }
}
