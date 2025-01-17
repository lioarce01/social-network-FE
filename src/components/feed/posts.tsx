"use client";
import React, { useState } from "react";
import { useGetPostsQuery } from "@/redux/api/postApi";
import PostCard from "./postCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { PostFilters } from "./postFilters";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

const Posts = () => {
  const [queryParams, setQueryParams] = useState({
    offset: 0,
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data, isLoading, isFetching } = useGetPostsQuery(queryParams);
  const { currentUser } = useCurrentUser();

  const handleLoadMore = () => {
    setQueryParams({
      ...queryParams,
      offset: queryParams.offset + queryParams.limit,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-[200px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PostFilters
        sortBy={queryParams.sortBy}
        sortOrder={queryParams.sortOrder}
        onSortChange={(sortBy, sortOrder) =>
          setQueryParams({ ...queryParams, sortBy, sortOrder, offset: 0 })
        }
      />
      <div className="space-y-4">
        {data?.map((post: any) => (
          <PostCard key={post.id} post={post} currentUser={currentUser} />
        ))}
      </div>
      {data?.length === queryParams.limit && (
        <div className="flex justify-center mt-6">
          <Button onClick={handleLoadMore} disabled={isFetching}>
            {isFetching ? <Loader2 className="animate-spin" /> : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Posts;
