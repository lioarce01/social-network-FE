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

const JobListComponent = () => {
  const { data: jobs, isLoading, error } = useGetJobsQuery({});
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs ? (
        jobs.map((job: any) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{job.title}</span>
                {job.featured && <Badge variant="secondary">Featured</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            <CardFooter className="flex justify-between items-center">
              <Button asChild>
                <Link href={`/jobpostings/${job.id}`}>View Details</Link>
              </Button>
              <Button>Apply Now</Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default JobListComponent;
