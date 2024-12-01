import Link from "next/link";
import React from "react";
import { BsTelephoneFill } from "react-icons/bs";

type Props = {
   phone: string;
};

const PhoneCell = (props: Props) => {
   const phone: string = props.phone;
   if (!phone) return;

   return (
      <Link
         href={"tel:" + phone}
         className="inline-flex gap-1 items-center bg-secondary px-1.5 overflow-hidden py-0.5 rounded"
      >
         <BsTelephoneFill className="h-4 w-4" />
         {phone}
      </Link>
   );
};

export default PhoneCell;
