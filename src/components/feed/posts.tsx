"use client";
import React, { useState, useEffect } from "react";
import { useGetPostsQuery } from "@/redux/api/postApi";
import PostCard from "./postCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { PostFilters } from "./postFilters";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import PostSkeleton from "./postSkeleton";

const Posts = () => {
  const [queryParams, setQueryParams] = useState({
    offset: 0,
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [allPosts, setAllPosts] = useState<any[]>([]);

  const { data, isLoading, isFetching } = useGetPostsQuery(queryParams);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (data) {
      setAllPosts((prevPosts) => {
        const newPosts = data.filter(
          (newPost: any) =>
            !prevPosts.some((existingPost) => existingPost.id === newPost.id),
        );
        return [...prevPosts, ...newPosts];
      });
    }
  }, [data]);

  const handleLoadMore = () => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      offset: prevParams.offset + prevParams.limit,
    }));
  };

  const handleSortChange = (sortBy: string, sortOrder: string) => {
    setQueryParams({
      ...queryParams,
      sortBy,
      sortOrder,
      offset: 0,
    });
    setAllPosts([]);
  };

  if (isLoading && allPosts.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PostFilters
        sortBy={queryParams.sortBy}
        sortOrder={queryParams.sortOrder}
        onSortChange={handleSortChange}
      />
      <div className="space-y-4">
        {allPosts.map((post: any) => (
          <PostCard key={post.id} post={post} currentUser={currentUser} />
        ))}
      </div>
      {data && data.length === queryParams.limit && (
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
