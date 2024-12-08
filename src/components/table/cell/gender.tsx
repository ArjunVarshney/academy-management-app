import { cn } from "@/lib/utils";
import React from "react";
import { FaMale, FaFemale } from "react-icons/fa";

type Props = {
   gender: "MALE" | "FEMALE";
};

const GenderCell = (props: Props) => {
   const gender: string = props.gender;
   if (!gender) return;

   let Icon;

   if (gender === "MALE") Icon = <FaMale />;
   else if (gender === "FEMALE") Icon = <FaFemale />;

   return (
      <div className="flex gap-2 items-center">
         <span
            className={cn(
               "px-0.5 py-1 rounded text-destructive-foreground",
               gender === "MALE" ? "bg-blue-600" : "bg-pink-600"
            )}
         >
            {Icon}
         </span>
         {gender.substring(0, 1) + gender.substring(1).toLowerCase()}
      </div>
   );
};

export default GenderCell;
