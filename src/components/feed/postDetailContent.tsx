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
import { selectLoading, selectPostId } from "@/redux/slices/postSlice";
import PostDetailSkeleton from "./postDetailSkeleton";

const PostDetailContent = () => {
  const postId = useSelector(selectPostId);
  const loading = useSelector(selectLoading);
  const router = useRouter();
  const {
    data: queryPost,
    isLoading,
    error,
  } = useGetPostByIdQuery(postId, {
    skip: !postId,
  });
  const { currentUser } = useCurrentUser();

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
        {loading || isLoading ? (
          <PostDetailSkeleton />
        ) : (
          <PostDetail queryPost={queryPost} currentUser={currentUser} />
        )}
      </div>
    </div>
  );
};

export default PostDetailContent;
