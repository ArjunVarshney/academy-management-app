"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
   const router = useRouter();
   const [isLoading, setIsLoading] = React.useState<boolean>(false);

   async function onSubmit(event: React.SyntheticEvent) {
      event.preventDefault();
      setIsLoading(true);

      const formData = new FormData(event.target as HTMLFormElement);
      const email = formData.get("email");
      const password = formData.get("password");

      console.log(email, password);

      router.push("/")

      setTimeout(() => {
         setIsLoading(false);
      }, 3000);
   }

   return (
      <div className={cn("grid gap-6", className)} {...props}>
         <form onSubmit={onSubmit}>
            <div className="grid gap-2">
               <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                     Email
                  </Label>
                  <Input
                     id="email"
                     name="email"
                     placeholder="name@example.com"
                     type="email"
                     autoCapitalize="none"
                     autoComplete="email"
                     autoCorrect="off"
                     disabled={isLoading}
                  />
                  <Label className="sr-only" htmlFor="password">
                     Password
                  </Label>
                  <Input
                     id="password"
                     name="password"
                     placeholder="xxxxx"
                     type="password"
                     autoCapitalize="none"
                     autoCorrect="off"
                     disabled={isLoading}
                  />
               </div>
               <Button disabled={isLoading}>
                  {isLoading && (
                     <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In with Email
               </Button>
            </div>
         </form>
      </div>
   );
}
