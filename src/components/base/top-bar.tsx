"use client";

import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";

type Props = {};

const TopBar = (props: Props) => {
   const [isMounted, setIsMounted] = useState<Boolean>(false);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   if (!isMounted) return null;

   let title = document.title;
   title = title.substring(0, title.indexOf("|") - 1);
   return (
      <div className="flex items-center gap-2">
         <SidebarTrigger />
         <div className="border h-4 rounded"></div>
         <h2 className="ml-2 font-semibold">{title}</h2>
      </div>
   );
};

export default TopBar;
