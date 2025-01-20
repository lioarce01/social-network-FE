"use client";

import React from "react";
import { useGetPostByIdQuery } from "@/redux/api/postApi";
import { useParams, useRouter } from "next/navigation";
import PostDetail from "@/components/feed/postDetail";
import { Loader2 } from "lucide-react";
import useCurrentUser from "@/hooks/useCurrentUser";

const PostDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = useParams();
  const router = useRouter();
  const { data: queryPost, isLoading, error } = useGetPostByIdQuery(id);
  const { currentUser } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  if (error || !queryPost) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
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
    <div className="container mx-auto p-4">
      <PostDetail queryPost={queryPost} currentUser={currentUser} />
    </div>
  );
};

export default PostDetailPage;
