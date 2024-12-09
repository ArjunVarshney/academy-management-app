"use client";

import * as React from "react";
import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   VisibilityState,
   flexRender,
   getCoreRowModel,
   getFacetedRowModel,
   getFacetedUniqueValues,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import useLocalStorageState from "use-local-storage-state";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "../../app/(main)/users/_components/data-table-toolbar";
import { TooltipProvider } from "../ui/tooltip";

interface DataTableProps<TData, TValue> {
   columns: (ColumnDef<TData, TValue> & { accessorKey?: string })[];
   data: TData[];
}

export function DataTable<TData, TValue>({
   columns,
   data,
   visibleColumns,
}: DataTableProps<TData, TValue> & {
   visibleColumns: { [key: string]: boolean };
}) {
   const allInvisible: { [key: string]: boolean } = {};
   columns.map((col) => {
      if (col.accessorKey) allInvisible[col.accessorKey] = false;
   });

   const [rowSelection, setRowSelection] = React.useState({});
   const [columnVisibility, setColumnVisibility] =
      useLocalStorageState<VisibilityState>("user-columns-visible", {
         defaultValue: { ...allInvisible, ...visibleColumns },
      });
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   );
   const [sorting, setSorting] = React.useState<SortingState>([]);

   const table = useReactTable({
      data,
      columns,
      state: {
         sorting,
         columnVisibility,
         rowSelection,
         columnFilters,
      },
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      filterFns: {
         orFilter: (row, columnId, filterValue) => {
            return filterValue.includes(row.original[columnId]);
         },
      },
   });

   return (
      <TooltipProvider delayDuration={300}>
         <div className="space-y-4">
            <DataTableToolbar table={table} />
            <div className="rounded-md border">
               <Table>
                  <TableHeader>
                     {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                           {headerGroup.headers.map((header) => {
                              return (
                                 <TableHead
                                    key={header.id}
                                    colSpan={header.colSpan}
                                 >
                                    {header.isPlaceholder
                                       ? null
                                       : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                         )}
                                 </TableHead>
                              );
                           })}
                        </TableRow>
                     ))}
                  </TableHeader>
                  <TableBody>
                     {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                           <TableRow
                              key={row.id}
                              data-state={row.getIsSelected() && "selected"}
                              className="cursor-pointer"
                           >
                              {row.getVisibleCells().map((cell) => (
                                 <TableCell key={cell.id}>
                                    {flexRender(
                                       cell.column.columnDef.cell,
                                       cell.getContext()
                                    )}
                                 </TableCell>
                              ))}
                           </TableRow>
                        ))
                     ) : (
                        <TableRow>
                           <TableCell
                              colSpan={columns.length}
                              className="h-24 text-center"
                           >
                              No results.
                           </TableCell>
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
            </div>
            <DataTablePagination table={table} />
         </div>
      </TooltipProvider>
   );
}
