import { Button } from "@/components/ui/button";

export default function Home() {
   return (
      <div className="h-screen w-screen flex items-center justify-center bg-indigo-600 gap-2">
         <Button>Sign-in</Button>
         <Button>Enquire</Button>
      </div>
   );
}
