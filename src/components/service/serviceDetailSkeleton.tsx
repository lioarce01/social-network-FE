import React from 'react'

import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ServiceDetailSkeleton = () => {
  return (
    <Card>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div className="w-full sm:w-auto">
            <div className="flex justify-between items-center sm:block">
              <Skeleton className="w-3/4 h-6 mb-2 sm:mb-0" />{" "}
              <Skeleton className="w-1/4 h-4" />
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Skeleton className="w-16 h-4" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-24 h-4" />
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground mt-4">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-24 h-4" />
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">
            <Skeleton className="w-32 h-4" />{" "}
          </h3>
          <Skeleton className="w-full h-24" />
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">
            <Skeleton className="w-44 h-4" />{" "}
          </h3>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-20 h-6" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <Skeleton className="w-full h-12" />
      </div>
    </Card>
  )
}

export default ServiceDetailSkeleton