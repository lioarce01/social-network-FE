"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const JobListSkeleton = () => {
  return (
    <div className="flex justify-center w-full p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Filters Section Skeleton */}
        <aside className="md:col-span-1">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Job List Section Skeleton */}
        <main className="md:col-span-3">
          <div className="grid gap-4 sm:gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={index}
                className="flex flex-col justify-between w-[700px]"
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-col space-y-2">
                      <Skeleton className="h-6 w-48 sm:w-64" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-6 w-16 mt-2 sm:mt-0 sm:ml-2" />
                  </div>
                  <Skeleton className="h-6 w-16 mt-2" />
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
                    <Skeleton className="h-4 w-24 mb-2 sm:mb-0" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardContent>

                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Load More Button Skeleton */}
          <div className="flex justify-center mt-4">
            <Skeleton className="h-10 w-32" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobListSkeleton;
