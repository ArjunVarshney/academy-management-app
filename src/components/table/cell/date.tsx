import { Row } from "@tanstack/react-table";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";

const DateCell = ({ date: d }: { date: string }) => {
   const date = new Date(d);
   if (!date || !date.getDate()) return;

   const today = new Date();

   const yrs = today.getFullYear() - date.getFullYear();
   const months = today.getMonth() - date.getMonth();

   let time_string = "";
   if (yrs > 1) time_string += yrs + " years ";
   else if (yrs == 1) time_string += yrs + " year ";

   if (months > 1) time_string += months + " months";
   else if (months == 1) time_string += months + " month";

   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <div>
               {date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()}
            </div>
         </TooltipTrigger>
         <TooltipContent side="bottom">{time_string}</TooltipContent>
      </Tooltip>
   );
};

export default DateCell;
