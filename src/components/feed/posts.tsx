"use client";
import React, { useState, useEffect } from "react";
import { useGetPostsQuery } from "@/redux/api/postApi";
import PostCard from "./postCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { PostFilters } from "./postFilters";
import PostSkeleton from "./postSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  addPosts,
  selectAllPosts,
  selectLoading,
  selectTotalJobsCount,
  setPosts,
  setTotalCount,
  selectNoMorePosts,
  setNoMorePosts,
} from "@/redux/slices/postSlice";

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => selectAllPosts(state) || []);

  const noMorePosts = useSelector(selectNoMorePosts);

  const [queryParams, setQueryParams] = useState({
    offset: 0,
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data, isLoading, isFetching } = useGetPostsQuery(queryParams);
  const loading = useSelector(selectLoading);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (data && data.posts) {
      if (data.posts.length === 0) {
        dispatch(setNoMorePosts(true));
      } else {
        if (queryParams.offset === 0) {
          dispatch(setPosts(data.posts));
        } else {
          dispatch(addPosts(data.posts));
        }
        dispatch(setTotalCount(data.totalCount));
      }
    }
  }, [data, dispatch, queryParams.offset]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (
      scrollHeight - scrollTop <= clientHeight + 100 &&
      !isFetching &&
      !noMorePosts
    ) {
      setQueryParams((prevParams) => ({
        ...prevParams,
        offset: prevParams.offset + prevParams.limit,
      }));
    }
  };

  useEffect(() => {
    if (!noMorePosts) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching, noMorePosts]);

  if (isLoading || (loading && posts.length === 0)) {
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
          dispatch(setNoMorePosts(false));
        }}
      />
      <div className="space-y-4">
        {posts.length > 0
          ? posts.map((post: any) => (
              <PostCard key={post.id} post={post} currentUser={currentUser} />
            ))
          : // Mostrar "No posts found" solo si no hay posts y no se está cargando
            !isFetching && (
              <div className="text-center text-gray-500">No posts found</div>
            )}
      </div>
      {isFetching && <div className="space-y-4">{<PostSkeleton />}</div>}
      {noMorePosts && posts.length > 0 && (
        // Mostrar "No more posts available" solo si no hay más posts y ya hay posts en la lista
        <div className="text-center text-gray-500">No more posts available</div>
      )}
    </div>
  );
};

export default Posts;
