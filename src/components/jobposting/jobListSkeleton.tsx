import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

const JobListSkeleton = () => {
  const skeletons = Array(6).fill(null);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-lg mx-auto">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {skeletons.map((_, index) => (
            <Card
              key={index}
              className="flex flex-col h-full w-full md:w-94 lg:w-[320px]"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <Skeleton className="w-2/4 h-4" />
                  <Skeleton className="w-1/4 h-4" />
                </CardTitle>
                <Skeleton className="mt-2 w-20 h-4" />{" "}
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="w-16 h-4" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="w-16 h-4" />
                  </div>
                </div>
                <Skeleton className="w-full h-12" />{" "}
              </CardContent>
              <CardFooter className="flex justify-between mt-auto">
                <Button asChild className="w-full">
                  <a className="w-full">
                    <Skeleton className="w-full h-10" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobListSkeleton;
