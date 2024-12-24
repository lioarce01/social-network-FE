"use client";
import React from "react";
import { useGetPostsQuery } from "@/redux/api/postApi";
import PostCard from "./postCard";
import useCurrentUser from "@/hooks/useCurrentUser";

const Posts = () => {
  const { data: posts, isLoading } = useGetPostsQuery({});
  const { currentUser } = useCurrentUser();

  const sortedPosts = posts?.slice().sort((a: any, b: any) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {sortedPosts?.map((post: any) => (
        <PostCard key={post.id} post={post} currentUser={currentUser} />
      ))}
    </>
  );
};

export default Posts;
