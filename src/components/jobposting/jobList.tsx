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
import JobFilters from "./jobListFilters";

const JobListComponent = () => {
  const [queryParams, setQueryParams] = useState({
    offset: 0,
    limit: 6,
    sortBy: ["createdAt"],
    sortOrder: "desc",
  });

  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const { data: jobs, isLoading, isFetching } = useGetJobsQuery(queryParams);

  useEffect(() => {
    if (jobs && !isFiltering) {
      setAllJobs((prevJobs) => {
        const newJobs = jobs.filter(
          (newJob: any) =>
            !prevJobs.some((existingJob) => existingJob.id === newJob.id),
        );
        return [...prevJobs, ...newJobs];
      });
    } else if (jobs && isFiltering) {
      setAllJobs(jobs);
      setIsFiltering(false);
    }
  }, [jobs, isFiltering]);

  const handleLoadMore = () => {
    setQueryParams((prevQueryParams) => ({
      ...prevQueryParams,
      offset: prevQueryParams.offset + prevQueryParams.limit,
    }));
  };

  const handleSortChange = (sortBy: string[], sortOrder: string) => {
    setIsFiltering(true);
    setQueryParams({
      ...queryParams,
      sortBy,
      sortOrder,
      offset: 0,
    });
  };

  if (isLoading || (isFetching && isFiltering)) return <JobListSkeleton />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <JobFilters
            sortBy={queryParams.sortBy}
            sortOrder={queryParams.sortOrder}
            onSortChange={handleSortChange}
          />
        </aside>
        <main className="md:col-span-3">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {allJobs.length > 0 ? (
              allJobs.map((job: any) => (
                <Card key={job.id} className="flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <span
                          className="text-lg font-semibold truncate max-w-[200px] lg:max-w-[300px]"
                          title={job.title}
                        >
                          {job.title}
                        </span>
                        <span className="text-sm text-muted-foreground">
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
                    <div className="flex items-start space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" aria-hidden="true" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center">
                        <DollarSign
                          className="mr-1 h-4 w-4"
                          aria-hidden="true"
                        />
                        <span>{job.budget}</span>
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
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
            <div className="flex justify-center mt-8">
              <Button onClick={handleLoadMore} disabled={isFetching}>
                {isFetching ? (
                  <Loader2 className="animate-spin mr-2" aria-hidden="true" />
                ) : null}
                {isFetching ? "Loading..." : "Load more"}
                <span className="sr-only">
                  {isFetching ? "Loading more jobs" : "Load more jobs"}
                </span>
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobListComponent;
