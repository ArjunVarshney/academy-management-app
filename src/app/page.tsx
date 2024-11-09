import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
   return (
      <div className="h-screen w-screen flex items-center justify-center bg-indigo-600 gap-2">
         <Link href={"/sign-in"} className={cn(buttonVariants())}>Sign-in</Link>
         <Button>Enquire</Button>
      </div>
   );
}
