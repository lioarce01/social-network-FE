import Link from "next/link";
import React from "react";
import { CardFooter } from "../ui/card";
import { MessageSquare } from "lucide-react";
import LikeButton from "./likeButton";
import UnlikeButton from "./unlikeButton";
import { userLikedAPost } from "@/lib/utils";
import useGetLikedPosts from "@/hooks/useGetLikedPosts";

const CardFooterComponent = ({ post }: any) => {
  const { likedPosts, isLoading } = useGetLikedPosts();

  if (isLoading) {
    <p>Loading...</p>;
  }

  const hasLiked = userLikedAPost(post, likedPosts);

  return (
    <CardFooter className="flex justify-between border-t py-2 sm:py-4">
      {hasLiked ? (
        <UnlikeButton post={post} />
      ) : (
        <LikeButton post={post} />
      )}
      <Link
        href={`/feed/${post?.id}`}
        className="text-xs sm:text-sm flex items-center"
      >
        <MessageSquare className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
        Comment
      </Link>
    </CardFooter>
  );
};

export default CardFooterComponent;
