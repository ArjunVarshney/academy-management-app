import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
   try {
      const session = await getSession();
      if (!session) {
         return NextResponse.json({ user: null }, { status: 401 });
      }
      return NextResponse.json({ user: session.user });
   } catch (error) {
      console.error("Failed to fetch session:", error);
      return NextResponse.json(
         { error: true, message: "Failed to fetch session" },
         { status: 500 }
      );
   }
}