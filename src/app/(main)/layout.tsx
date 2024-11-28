import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Metadata } from "next";
import TopBar from "@/components/base/top-bar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
   title: "Home | The Modern School",
   description: "Home Page",
};

export default async function Layout({
   children,
}: {
   children: React.ReactNode;
}) {
   const session = await getSession();

   // redirect if the session is not present
   if (!session) return redirect("/sign-in");

   // if user session in present return the ui
   return (
      <SidebarProvider defaultOpen={true}>
         <AppSidebar />
         <main className="p-3">
            <TopBar />
            <div className="px-1.5 py-3">{children}</div>
         </main>
      </SidebarProvider>
   );
}
