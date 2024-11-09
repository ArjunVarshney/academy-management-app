"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
   const router = useRouter();
   const [isLoading, setIsLoading] = React.useState<boolean>(false);
   const { toast } = useToast();

   async function onSubmit(event: React.SyntheticEvent) {
      event.preventDefault();
      setIsLoading(true);

      const formData = new FormData(event.target as HTMLFormElement);
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      const res = await login(username, password);

      if (res.error) {
         toast({
            variant: "destructive",
            title: "Error",
            description: res.message,
         });
      }

      if (res.success) {
         toast({
            variant: "default",
            description: res.message,
         });

         router.push("/dashboard");
      }

      setIsLoading(false);
   }

   return (
      <div className={cn("grid gap-6", className)} {...props}>
         <form onSubmit={onSubmit}>
            <div className="grid gap-2">
               <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="username">
                     Username
                  </Label>
                  <Input
                     id="username"
                     name="username"
                     placeholder="John Doe"
                     type="text"
                     autoCapitalize="none"
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
                  Sign In with Username
               </Button>
            </div>
         </form>
      </div>
   );
}
