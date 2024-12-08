import * as React from "react";
import { Column } from "@tanstack/react-table";
import { Check, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Command,
   CommandGroup,
   CommandItem,
   CommandList,
   CommandSeparator,
} from "@/components/ui/command";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Input } from "../ui/input";

interface DataTableRangeFilterProps<TData, TValue> {
   column?: Column<TData, TValue>;
   title?: string;
   min: number;
   max: number;
   desc?: string;
}

export function DataTableRangeFilter<TData, TValue>({
   column,
   title,
   min,
   max,
   desc,
}: DataTableRangeFilterProps<TData, TValue>) {
   const [minVal, maxVal] = (column?.getFilterValue() || [
      min,
      max,
   ]) as number[];

   const handleMinAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (
         value === "" ||
         (/^\d+$/.test(value) &&
            parseInt(value) <= maxVal &&
            parseInt(value) >= min)
      ) {
         column?.setFilterValue([parseInt(value), maxVal]);
      }
   };

   const handleMaxAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (
         value === "" ||
         (/^\d+$/.test(value) &&
            parseInt(value) >= minVal &&
            parseInt(value) <= max)
      ) {
         column?.setFilterValue([minVal, parseInt(value)]);
      }
   };

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 border-dashed">
               <PlusCircle />
               {title}
               {(minVal > min || maxVal < max) && (
                  <>
                     <Separator orientation="vertical" className="mx-2 h-4" />
                     <div className="hidden space-x-1 lg:flex">
                        <Badge
                           variant="secondary"
                           className="rounded-sm px-1 font-normal"
                        >
                           {minVal} - {maxVal} {desc || ""}
                        </Badge>
                     </div>
                  </>
               )}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
               <CommandList>
                  <CommandGroup>
                     <div className="flex items-center space-x-2">
                        <Input
                           type="number"
                           value={"" + minVal}
                           onChange={handleMinAgeChange}
                           className="w-20 text-center"
                           placeholder="Min"
                           min={min}
                           max={max}
                        />
                        <span className="text-sm text-muted-foreground">
                           to
                        </span>
                        <Input
                           type="number"
                           value={"" + maxVal}
                           onChange={handleMaxAgeChange}
                           className="w-20 text-center"
                           placeholder="Max"
                           min={min}
                           max={max}
                        />
                     </div>
                  </CommandGroup>
                  {(minVal > min || maxVal < max) && (
                     <>
                        <CommandSeparator />
                        <CommandGroup>
                           <CommandItem
                              onSelect={() => column?.setFilterValue(undefined)}
                              className="justify-center text-center"
                           >
                              Clear filters
                           </CommandItem>
                        </CommandGroup>
                     </>
                  )}
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   );
}
