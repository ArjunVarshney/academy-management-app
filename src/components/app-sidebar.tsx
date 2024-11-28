import {
   Home,
   Settings,
   UserCog,
   User,
   UserPlus,
   GraduationCap,
   BookUser,
   School,
   CircleFadingArrowUp,
   Shapes,
   Book,
   BookPlus,
   FileUser,
   Sheet,
   Presentation,
   BookOpenCheck,
   CalendarDays,
   Speech,
   CalendarCog,
   StickyNote,
   OctagonX,
   Award,
} from "lucide-react";
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
import { usePathname } from "next/navigation";

// Menu items.
const items = [
   {
      name: "",
      navs: [
         {
            title: "Home",
            url: "/dashboard",
            icon: Home,
         },
         {
            title: "Settings",
            url: "/settings",
            icon: Settings,
         },
      ],
   },
   {
      name: "Users",
      navs: [
         {
            title: "All",
            url: "/users",
            icon: User,
         },
         {
            title: "Staff",
            url: "/staff",
            icon: UserPlus,
         },
         {
            title: "Admins",
            url: "/admins",
            icon: UserCog,
         },
         {
            title: "Teachers",
            url: "/teachers",
            icon: BookUser,
         },
         {
            title: "Students",
            url: "/students",
            icon: GraduationCap,
         },
      ],
   },
   {
      name: "Manage",
      navs: [
         {
            title: "Grades",
            url: "/grades",
            icon: CircleFadingArrowUp,
         },
         {
            title: "Classes",
            url: "/classes",
            icon: Shapes,
         },
         {
            title: "Subjects",
            url: "/subjects",
            icon: Book,
         },
         {
            title: "Assignments",
            url: "/assignments",
            icon: BookPlus,
         },
         {
            title: "Results",
            url: "/results",
            icon: FileUser,
         },
      ],
   },
   {
      name: "Schedule",
      navs: [
         {
            title: "Time tables",
            url: "/timetables",
            icon: Sheet,
         },
         {
            title: "Lessons",
            url: "/lessons",
            icon: Presentation,
         },
         {
            title: "Exams",
            url: "/exams",
            icon: BookOpenCheck,
         },
      ],
   },
   {
      name: "Activity",
      navs: [
         {
            title: "Calander",
            url: "/calander",
            icon: CalendarDays,
         },
         {
            title: "Announcements",
            url: "/announcements",
            icon: Speech,
         },
         {
            title: "Events",
            url: "/events",
            icon: CalendarCog,
         },
         {
            title: "Posts",
            url: "/posts",
            icon: StickyNote,
         },
         {
            title: "Complaints",
            url: "/complaints",
            icon: OctagonX,
         },
         {
            title: "Achievements",
            url: "/achievements",
            icon: Award,
         },
      ],
   },
];

export function AppSidebar() {
   return (
      <Sidebar>
         <SidebarHeader className="bg-slate-200 dark:bg-slate-800">
            <div className="flex gap-2 items-center p-1.5 font-semibold">
               <School className="bg-white dark:bg-slate-900 border rounded-lg p-1 w-8 h-8" />
               <span className="font-semibold leading-5">
                  The Modern School
               </span>
            </div>
         </SidebarHeader>
         <SidebarContent className="gap-0 scrollbar-thin scrollbar-track-transparent">
            {items.map(({ name, navs }, index) => (
               <SidebarGroup key={name + index}>
                  {name && <SidebarGroupLabel>{name}</SidebarGroupLabel>}
                  <SidebarGroupContent>
                     <SidebarMenu>
                        {navs.map((item) => (
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
            ))}
         </SidebarContent>
         <SidebarFooter>
            <ModeToggle />
         </SidebarFooter>
      </Sidebar>
   );
}
