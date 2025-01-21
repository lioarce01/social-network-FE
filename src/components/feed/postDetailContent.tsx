"use client";
import React from "react";
import PostDetail from "./postDetail";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ArrowLeftIcon, ArrowLeftSquare, Loader2 } from "lucide-react";
import { useGetPostByIdQuery } from "@/redux/api/postApi";
import { useRouter } from "next/navigation";
import { IconLeft } from "react-day-picker";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { selectPostId } from "@/redux/slices/postSlice";

const PostDetailContent = () => {
  const postId = useSelector(selectPostId);
  const router = useRouter();
  const {
    data: queryPost,
    isLoading,
    error,
  } = useGetPostByIdQuery(postId, {
    skip: !postId,
  });
  const { currentUser } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex justify-center w-full min-h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  if (error || !queryPost) {
    return (
      <div className="flex flex-col  justify-center space-y-4">
        <p className="text-lg text-gray-600">Failed to load the post.</p>
        <button
          className="text-blue-500 underline"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-center py-12 items-start gap-4">
      <Button
        variant="ghost"
        className="mx-4 flex items-center"
        onClick={() => router.back()}
      >
        ← Back
      </Button>
      <div className="w-full md:max-w-[60vw] lg:max-w-[50vw] xl:max-w-[40vw] bg-white p-4 rounded-lg shadow-md">
        <PostDetail queryPost={queryPost} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default PostDetailContent;
