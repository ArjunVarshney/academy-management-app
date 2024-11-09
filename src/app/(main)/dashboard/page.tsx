import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const DashboardPage = async (props: Props) => {
   const session = await getSession();

   // redirect if the session is not present
   if (!session) return redirect("/sign-in");
   
   console.log(session.user);
   // Todo: Get the user from the backend and show dash accordingly.
   // Fetch user
   // redirect if not preset or if unauthorized
   // add user to global state

   return <div>DashboardPage</div>;
};

export default DashboardPage;
