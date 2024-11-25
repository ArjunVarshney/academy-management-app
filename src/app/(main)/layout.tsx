import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <SidebarProvider defaultOpen={true}>
         <AppSidebar />
         <main className="p-3">
            <div className="flex items-center gap-2">
               <SidebarTrigger />
               <div className="border h-4 rounded"></div>
               <Breadcrumb className="ml-3">
                  <BreadcrumbList>
                     <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                     </BreadcrumbItem>
                     <BreadcrumbSeparator />
                     <BreadcrumbItem>
                        <BreadcrumbLink href="/components">
                           Components
                        </BreadcrumbLink>
                     </BreadcrumbItem>
                     <BreadcrumbSeparator />
                     <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                     </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
            </div>

            <div className="px-1.5 py-3">{children}</div>
         </main>
      </SidebarProvider>
   );
}
