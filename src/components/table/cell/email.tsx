import Link from "next/link";
import React from "react";
import { IoIosMail } from "react-icons/io";

type Props = {
   email: string;
};

const EmailCell = (props: Props) => {
   const email: string = props.email;
   if (!email) return;

   return (
      <Link
         href={"mailto:" + email}
         className="inline-flex gap-1 items-center bg-secondary px-1.5 overflow-hidden py-0.5 rounded"
      >
         <IoIosMail className="h-5 w-5" />
         {email}
      </Link>
   );
};

export default EmailCell;
