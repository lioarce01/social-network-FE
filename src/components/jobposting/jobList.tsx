"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DollarSign, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useGetJobsQuery } from "@/redux/api/jobPostingApi";
import ApplyJob from "./applyJob";

const JobListComponent = () => {
  const { data: jobs, isLoading, error } = useGetJobsQuery({});
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-lg mx-auto ">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {jobs ? (
            jobs.map((job: any) => (
              <Card key={job.id} className=" flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{job.title}</span>
                    <p className="text-sm text-neutral-500">{job.mode}</p>
                  </CardTitle>
                  {job.featured && (
                    <Badge variant="secondary" className="mt-2">
                      Featured
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" /> {job.location}
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="mr-1 h-4 w-4" /> {job.budget}
                    </span>
                  </div>
                  <p className="text-sm">{job.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between mt-auto ">
                  <Button asChild className="w-full">
                    <Link href={`/jobpostings/${job.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListComponent;
