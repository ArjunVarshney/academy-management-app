"use server";

import { expiresIn, secret } from "@/settings/auth";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import db from "./db";

const key = secret;

export async function encrypt(payload: any) {
   return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30 days from now")
      .sign(key);
}

export async function decrypt(input: string): Promise<any> {
   const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
   });
   return payload;
}

export async function login(username: string, password: string) {
   try {
      // Verify credentials && get the user
      const user = await verifyUserCredentials(username, password);
      if (!user) {
         return {
            error: true,
            message: "Invalid credentials. Try again!",
         };
      }

      // Create the session
      const expires = new Date(Date.now() + expiresIn);
      const session = await encrypt({ user, expires });

      // Save the session in a cookie
      (await cookies()).set("session", session, { expires, httpOnly: true });
      return { success: true, message: "Login Successfull" };
   } catch (err) {
      // Handle unexpected errors
      console.error("Login error:", err);
      return { error: true, message: "A server error occurred during login" };
   }
}

async function verifyUserCredentials(username: string, password: string) {
   // user verification logic
   const user = await db.user.findUnique({
      where: {
         username,
         password,
      },
   });
   return user ? { username } : null;
}

export async function logout() {
   // Destroy the session
   (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSession() {
   const session = (await cookies()).get("session")?.value;
   if (!session) return null;
   return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
   const session = request.cookies.get("session")?.value;
   if (!session) return;

   // Refresh the session so it doesn't expire
   const parsed = await decrypt(session);
   parsed.expires = new Date(Date.now() + expiresIn);
   const res = NextResponse.next();
   res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
   });
   return res;
}
