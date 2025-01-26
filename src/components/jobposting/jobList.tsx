"use client";

import { useState } from "react";
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
import { setSearchParams } from "@/redux/slices/jobSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { Job, Mode } from "@/types/Job";
import SearchBarComponent from "./searchBar";
import { cn } from "@/lib/utils";

const JobListComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [sortConfig, setSortConfig] = useState<{
    sortBy: string[];
    sortOrder: "asc" | "desc";
  }>({ sortBy: ["createdAt"], sortOrder: "desc" });

  const searchParams = useSelector(
    (state: RootState) => state.jobs?.searchParams,
  );

  const {
    data: { jobs = [], totalCount = 0 } = {},
    isLoading,
    isFetching,
  } = useGetJobsQuery({
    offset: page * 6,
    limit: 6,
    ...sortConfig,
    searchTerm: searchParams?.searchTerm || "",
    mode: searchParams?.mode,
  });

  const handleLoadMore = () => setPage((prev) => prev + 1);
  const resetPagination = () => setPage(0);

  const handleSortChange = (sortBy: string[], sortOrder: "asc" | "desc") => {
    setSortConfig({ sortBy, sortOrder });
    resetPagination();
  };

  const handleSearch = (searchTerm: string, mode?: Mode) => {
    dispatch(setSearchParams({ searchTerm, mode }));
    resetPagination();
  };

  const handleCreateJob = () => router.push("/createJobPosting");

  if (isLoading) return <JobListSkeleton />;

  return (
    <div className="flex justify-center w-full p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-[100%] sm:max-w-[1200px] grid grid-cols-1 md:grid-cols-4 gap-4">
        <aside className="md:col-span-1 flex flex-col space-y-2 items-center">
          <JobFilters
            sortBy={sortConfig.sortBy}
            sortOrder={sortConfig.sortOrder}
            onSortChange={handleSortChange}
          />
          <Button onClick={handleCreateJob} className="w-full">
            Post a Job
          </Button>
        </aside>

        <main className="md:col-span-3">
          <SearchBarComponent onSearch={handleSearch} />

          <div className="grid gap-4 sm:gap-6">
            {jobs.length > 0 ? (
              jobs.map((job: Job) => (
                <Card
                  key={job.id}
                  className={cn(
                    "flex flex-col justify-between max-w-[700px]",
                    job.featured && "border-2 border-primary",
                  )}
                >
                  <CardHeader>
                    <CardTitle className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
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
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="secondary">{job.mode}</Badge>
                        {job.featured && (
                          <Badge variant="default">Featured</Badge>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="mr-1 h-4 w-4" />
                        <span>{job.budget}</span>
                      </div>
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
              <div className="col-span-full text-center text-muted-foreground p-8">
                No jobs found matching your criteria
              </div>
            )}
          </div>

          {jobs.length < totalCount && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleLoadMore}
                disabled={isFetching}
                className="min-w-[150px]"
              >
                {isFetching ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobListComponent;
