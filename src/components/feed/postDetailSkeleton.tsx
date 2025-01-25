import React from "react";
import { CardHeader } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

const PostDetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Post Header Skeleton */}
      <CardHeader className="flex flex-row justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <Skeleton className="w-10 h-10 rounded-full" />
          </Avatar>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
          </div>
        </div>
        <Skeleton className="w-8 h-8 rounded" />
      </CardHeader>

      {/* Post Content Skeleton */}
      <div className="space-y-2 bg-white px-4 py-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>

      {/* Comments Section Skeleton */}
      <div className="space-y-4">
        {/* Comment Input Skeleton */}
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-full rounded" />
          <Skeleton className="w-12git h-8 rounded" />
        </div>

        {/* Comment Header Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>

        {/* Single Comment Skeleton */}
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
          </div>
          <Skeleton className="h-4 w-full rounded" />
        </div>
      </div>
    </div>
  );
};

export default PostDetailSkeleton;
