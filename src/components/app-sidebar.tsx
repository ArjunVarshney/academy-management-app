import { Calendar, Home, Inbox, Search, Settings, Anchor } from "lucide-react";

import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";

// Menu items.
const items = [
   {
      title: "Home",
      url: "#",
      icon: Home,
   },
   {
      title: "Inbox",
      url: "#",
      icon: Inbox,
   },
   {
      title: "Calendar",
      url: "#",
      icon: Calendar,
   },
   {
      title: "Search",
      url: "#",
      icon: Search,
   },
   {
      title: "Settings",
      url: "#",
      icon: Settings,
   },
];

export function AppSidebar() {
   return (
      <Sidebar>
         <SidebarHeader className="bg-slate-200 dark:bg-slate-800">
            <div className="flex gap-2 items-center p-1.5 font-semibold">
               <Anchor className="bg-white dark:bg-slate-900 border rounded-lg p-1 w-8 h-8" />
               <span className="font-semibold leading-5">
                  The Modern School
               </span>
            </div>
         </SidebarHeader>
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel>Application</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                           <SidebarMenuButton asChild>
                              <a href={item.url}>
                                 <item.icon />
                                 <span>{item.title}</span>
                              </a>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>
         <SidebarFooter>
            <ModeToggle />
         </SidebarFooter>
      </Sidebar>
   );
}
