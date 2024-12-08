"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";

import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";
import { DataTableRangeFilter } from "@/components/table/data-table-range-filter";
import {
   BLOOD_GROUPS,
   GENDER_CATEGORIES,
   ROLES,
} from "@/constants/users/filter-categories";

interface DataTableToolbarProps<TData> {
   table: Table<TData>;
}

export function DataTableToolbar<TData>({
   table,
}: DataTableToolbarProps<TData>) {
   const isFiltered = table.getState().columnFilters.length > 0;

   return (
      <div className="flex items-center justify-between">
         <div className="flex flex-1 items-center space-x-2">
            <Input
               placeholder="Filter names..."
               value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
               }
               onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
               }
               className="h-8 w-[150px] lg:w-[250px]"
            />
            {table.getColumn("gender") && (
               <DataTableFacetedFilter
                  column={table.getColumn("gender")}
                  title="Gender"
                  options={GENDER_CATEGORIES}
               />
            )}
            {table.getColumn("role") && (
               <DataTableFacetedFilter
                  column={table.getColumn("role")}
                  title="Role"
                  options={ROLES}
               />
            )}
            {table.getColumn("bloodType") && (
               <DataTableFacetedFilter
                  column={table.getColumn("bloodType")}
                  title="Blood Group"
                  options={BLOOD_GROUPS}
               />
            )}
            {table.getColumn("dob") && (
               <DataTableRangeFilter
                  column={table.getColumn("dob")}
                  title="Age"
                  min={2}
                  max={80}
                  desc="years"
               />
            )}
            {table.getColumn("joined_at") && (
               <DataTableRangeFilter
                  column={table.getColumn("joined_at")}
                  title="Experience"
                  min={0}
                  max={30}
                  desc="years"
               />
            )}
            {isFiltered && (
               <Button
                  variant="ghost"
                  onClick={() => table.resetColumnFilters()}
                  className="h-8 px-2 lg:px-3"
               >
                  Reset
                  <X />
               </Button>
            )}
         </div>
         <DataTableViewOptions table={table} />
      </div>
   );
}
