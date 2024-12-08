"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { Acheivement, Gender, Role } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import DateCell from "@/components/table/cell/date";
import GenderCell from "@/components/table/cell/gender";
import EmailCell from "@/components/table/cell/email";
import PhoneCell from "@/components/table/cell/phone";

export type UserTableData = {
   id: string;
   username: string;
   role: Role;
   name: string;
   email: string;
   phone?: string;
   img?: string;
   gender: Gender;
   dob: string;
   bloodType: string;
   address: string;
   joined_at: string;
   achievements: Acheivement[];
};

export const columns: ColumnDef<UserTableData>[] = [
   {
      id: "select",
      header: ({ table }) => (
         <Checkbox
            checked={
               table.getIsAllPageRowsSelected() ||
               (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
               table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-[2px]"
         />
      ),
      cell: ({ row }) => (
         <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
         />
      ),
      enableSorting: false,
      enableHiding: false,
   },
   {
      accessorKey: "username",
      header: "Username",
   },
   {
      accessorKey: "name",
      header: "Name",
   },
   {
      accessorKey: "role",
      header: "Role",
      // @ts-ignore
      filterFn: "orFilter",
      cell: ({ row }) => {
         const role: string = row.getValue("role");
         let variant: "default" | "secondary" | "destructive";

         if (role === "OWNER") variant = "default";
         else if (role === "ADMIN") variant = "destructive";
         else variant = "secondary";

         return (
            <Badge variant={variant}>
               {role.substring(0, 1) + role.substring(1).toLowerCase()}
            </Badge>
         );
      },
   },
   {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <EmailCell email={row.getValue("email")} />,
   },
   {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <PhoneCell phone={row.getValue("phone")} />,
   },
   {
      accessorKey: "gender",
      header: "Gender",
      // @ts-ignore
      filterFn: "orFilter",
      cell: ({ row }) => <GenderCell gender={row.getValue("gender")} />,
   },
   {
      accessorKey: "dob",
      header: "Date of Birth",
      cell: ({ row }) => <DateCell date={row.getValue("dob")} />,
      filterFn: (row, columnId, value) => {
         const date = new Date(row.getValue(columnId));
         const today = new Date();

         const years = Math.floor(
            (today.getTime() - date.getTime()) / 3.15576e10
         );

         const [start, end] = value;

         return years >= start && years <= end;
      },
   },
   {
      accessorKey: "bloodType",
      header: "Blood Group",
      // @ts-ignore
      filterFn: "orFilter",
   },
   {
      accessorKey: "address",
      header: "Address",
   },
   {
      accessorKey: "joined_at",
      header: "Joined At",
      cell: ({ row }) => <DateCell date={row.getValue("joined_at")} />,
      filterFn: (row, columnId, value) => {
         const date = new Date(row.getValue(columnId));
         const today = new Date();

         const years = Math.floor(
            (today.getTime() - date.getTime()) / 3.15576e10
         );

         const [start, end] = value;

         return years >= start && years <= end;
      },
   },
   {
      accessorKey: "achievements",
      header: "Achievements",
   },
];

export const initialColumns = {
   username: true,
   name: true,
   role: true,
   phone: true,
};
