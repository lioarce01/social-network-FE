"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import JobListSkeleton from "./jobListSkeleton";
import JobFilters from "./jobListFilters";
import { useGetJobsQuery } from "@/redux/api/jobPostingApi";
import {
  selectAllJobs,
  selectTotalJobsCount,
  setJobs,
  addJobs,
  setTotalCount,
  selectLoading,
} from "@/redux/slices/jobSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const JobListComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const jobs = useSelector((state: RootState) => selectAllJobs(state) || []);
  const totalCount = useSelector(
    (state: RootState) => selectTotalJobsCount(state) || 0,
  );
  const loading = useSelector(selectLoading);
  const [queryParams, setQueryParams] = useState({
    offset: 0,
    limit: 6,
    sortBy: ["createdAt"] as string[],
    sortOrder: "desc" as "asc" | "desc",
  });

  const { data, isLoading, isFetching } = useGetJobsQuery(queryParams);

  useEffect(() => {
    if (data && data.jobs) {
      if (queryParams.offset === 0) {
        dispatch(setJobs(data.jobs));
      } else {
        dispatch(addJobs(data.jobs));
      }
      dispatch(setTotalCount(data.totalCount));
    }
  }, [data, dispatch, queryParams.offset]);

  const handleLoadMore = () => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      offset: prevParams.offset + prevParams.limit,
    }));
  };

  const handleSortChange = (sortBy: string[], sortOrder: "asc" | "desc") => {
    setQueryParams({
      ...queryParams,
      sortBy,
      sortOrder,
      offset: 0,
    });
  };

  const handleCreateJob = () => {
    router.push("/createJobPosting");
  };

  if (isLoading || (loading && jobs.length === 0)) return <JobListSkeleton />;

  return (
    <div className="flex justify-center w-full p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-[100%] sm:max-w-[1200px] grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Filters Section */}
        <aside className="md:col-span-1 flex flex-col space-y-2 items-center">
          <JobFilters
            sortBy={queryParams.sortBy}
            sortOrder={queryParams.sortOrder}
            onSortChange={handleSortChange}
          />
          <Button onClick={handleCreateJob}>Post a Job</Button>
        </aside>

        {/* Job List Section */}
        <main className="md:col-span-3">
          <div className="grid gap-4 sm:gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <Card
                  key={job.id}
                  className="flex flex-col justify-between max-w-[700px]"
                >
                  <CardHeader>
                    <CardTitle className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex flex-col">
                        <span
                          className="text-lg font-semibold truncate max-w-[200px] sm:max-w-[300px]"
                          title={job.title}
                        >
                          {job.title}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {job.category}
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="mt-2 sm:mt-0 sm:ml-2"
                      >
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
                    <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" aria-hidden="true" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center mt-2 sm:mt-0">
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
          {jobs.length < totalCount && (
            <div className="flex justify-center mt-4 max-w-[700px]">
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
