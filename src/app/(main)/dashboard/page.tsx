"use client";

import { PopulationChart } from "@/components/dashboard/population-chart";
import fetchCurrentUser from "@/hooks/get-current-user";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const DashboardPage = (props: Props) => {
   const {
      data: user,
      isLoading,
      error,
   } = useQuery({ queryKey: ["currentUser"], queryFn: fetchCurrentUser });

   // redirect if not preset or if unauthorized
   if (error || (!isLoading && !user)) return <p>No user found</p>;

   return <div>Some dashboard</div>;
};

export default DashboardPage;
