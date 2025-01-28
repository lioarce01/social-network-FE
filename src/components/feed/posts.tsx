"use client";
import React, { useState, useEffect } from "react";
import { useGetPostsQuery } from "@/redux/api/postApi";
import PostCard from "./postCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { PostFilters } from "./postFilters";
import PostSkeleton from "./postSkeleton";

const Posts = ({ onPostCreated }: { onPostCreated: () => void }) => {
  const { currentUser } = useCurrentUser();
  const [posts, setPosts] = useState<any[]>([]);
  const [noMorePosts, setNoMorePosts] = useState(false);

  const [queryParams, setQueryParams] = useState({
    offset: 0,
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data, isLoading, isFetching, refetch } =
    useGetPostsQuery(queryParams);

  useEffect(() => {
    if (data) {
      if (queryParams.offset === 0) {
        setPosts(data.posts);
      } else {
        setPosts((prev) => {
          const existingIds = new Set(prev.map((post) => post.id));
          const newPosts = data.posts.filter(
            (post: any) => !existingIds.has(post.id),
          );
          return [...prev, ...newPosts];
        });
      }
      setNoMorePosts(data.posts.length < queryParams.limit);
    }
  }, [data, queryParams.offset, queryParams.limit]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollHeight - scrollTop <= clientHeight + 100 &&
        !isFetching &&
        !noMorePosts
      ) {
        setQueryParams((prev) => ({
          ...prev,
          offset: prev.offset + prev.limit,
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, noMorePosts]);

  if (isLoading || (isFetching && posts.length === 0)) {
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
        onSortChange={(sortBy, sortOrder) => {
          setQueryParams({
            ...queryParams,
            sortBy,
            sortOrder,
            offset: 0,
          });
          setNoMorePosts(false);
        }}
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

      {isFetching && (
        <div className="space-y-4">
          <PostSkeleton />
        </div>
      )}
      {noMorePosts && posts.length > 0 && (
        <div className="text-center text-gray-500">No more posts available</div>
      )}
    </div>
  );
};

export default Posts;
