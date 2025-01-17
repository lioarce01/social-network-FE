import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { DollarSign, MapPin } from "lucide-react";

const JobListSkeleton = () => {
  const skeletons = Array(4).fill(null);

  return (
    <div className="">
      <div className="max-w-screen-lg mx-auto">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {skeletons.map((_, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between w-full md:w-94"
            >
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <Skeleton className="h-6 w-[200px] lg:w-[300px] mb-2" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </CardTitle>
                <Skeleton className="h-5 w-16 mt-2" />
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-start space-x-4 text-sm text-muted-foreground justify-start">
                  <span className="flex items-start">
                    <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                    <Skeleton className="h-4 w-20" />
                  </span>
                  <span className="flex items-start">
                    <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                    <Skeleton className="h-4 w-20" />
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Skeleton className="h-10 w-1/4" />
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
