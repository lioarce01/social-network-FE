"use client";
import React, { useState, useEffect } from "react";
import { useGetPostsQuery } from "@/redux/api/postApi";
import PostCard from "./postCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { PostFilters } from "./postFilters";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import PostSkeleton from "./postSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  addPosts,
  selectAllPosts,
  selectTotalJobsCount,
  setPosts,
  setTotalCount,
} from "@/redux/slices/postSlice";

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => selectAllPosts(state) || []);
  const totalCount = useSelector(
    (state: RootState) => selectTotalJobsCount(state) || 0,
  );

  const [queryParams, setQueryParams] = useState({
    offset: 0,
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data, isLoading, isFetching } = useGetPostsQuery(queryParams);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (data && data.posts) {
      if (queryParams.offset === 0) {
        dispatch(setPosts(data.posts));
      } else {
        dispatch(addPosts(data.posts));
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

  const handleSortChange = (sortBy: string, sortOrder: string) => {
    setQueryParams({
      ...queryParams,
      sortBy,
      sortOrder,
      offset: 0,
    });
  };

  if (isLoading && posts.length === 0) {
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
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <PostCard key={post.id} post={post} currentUser={currentUser} />
          ))
        ) : (
          <div className="text-center text-gray-500">No posts found</div>
        )}
      </div>
      {posts.length < totalCount && (
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
