"use client";
import React from "react";
import { useGetPostsQuery } from "@/redux/api/postApi";

import PostCard from "./postCard";

const Posts = () => {
  const { data: posts, isLoading } = useGetPostsQuery({});
  return (
    <>
      {posts?.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export default Posts;
