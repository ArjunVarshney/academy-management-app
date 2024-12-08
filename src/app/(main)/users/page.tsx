"use client";

import { useQuery } from "@tanstack/react-query";
import { columns, initialColumns } from "./_components/columns";
import axios from "axios";
import { DataTable } from "./_components/data-table";

export default function UsersPage() {
   const { data, isLoading, isError } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
         return await axios.get("http://localhost:3000/api/user");
      },
      staleTime: 10 * 60 * 1000,
   });

   return (
      <div className="max-w-full py-10">
         {!isLoading && !isError && (
            <DataTable
               columns={columns}
               data={data?.data.data}
               visibleColumns={initialColumns}
            />
         )}
      </div>
   );
}
