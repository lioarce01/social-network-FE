"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useGetJobsQuery } from "@/redux/api/jobPostingApi";
import JobListSkeleton from "./jobListSkeleton";

const JobListComponent = () => {
  const [queryParams, setQueryParams] = useState({
    offset: 0,
    limit: 2,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [allJobs, setAllJobs] = useState<any[]>([]);
  const { data: jobs, isLoading, error } = useGetJobsQuery(queryParams);

  useEffect(() => {
    if (jobs) {
      setAllJobs((prevJobs) => {
        const newJobs = jobs.filter(
          (newJob: any) =>
            !prevJobs.some((existingJob) => existingJob.id === newJob.id),
        );
        return [...prevJobs, ...newJobs];
      });
    }
  }, [jobs]);

  const handleLoadMore = () => {
    setQueryParams((prevQueryParams) => ({
      ...prevQueryParams,
      offset: prevQueryParams.offset + prevQueryParams.limit,
    }));
  };

  if (isLoading && allJobs.length === 0) return <JobListSkeleton />;

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {allJobs.length > 0 ? (
          allJobs.map((job: any) => (
            <Card
              key={job.id}
              className="flex flex-col justify-between w-full md:w-94"
            >
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span
                      className="text-lg font-semibold truncate max-w-[200px] lg:max-w-[300px]"
                      title={job.title}
                    >
                      {job.title}
                    </span>
                    <span className="text-sm text-neutral-600">
                      {job.category}
                    </span>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {job.mode}
                  </Badge>
                </CardTitle>

                {job.featured && (
                  <Badge variant="default" className="mt-2">
                    Featured
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-start space-x-4 text-sm text-muted-foreground justify-start">
                  <span className="flex items-start">
                    <MapPin className="mr-1 h-4 w-4" /> {job.location}
                  </span>
                  <span className="flex items-start">
                    <DollarSign className="mr-1 h-4 w-4" /> {job.budget}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/jobpostings/${job.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">
            No jobs found.
          </div>
        )}
      </div>
      {jobs && jobs.length === queryParams.limit && (
        <div className="flex justify-center items-center mt-4">
          <Button onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobListComponent;
