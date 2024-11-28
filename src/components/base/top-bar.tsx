"use client";

import React from "react";
import { SidebarTrigger } from "../ui/sidebar";

type Props = {};

const TopBar = (props: Props) => {
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
