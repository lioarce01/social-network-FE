import Link from "next/link";
import React from "react";
import { CardFooter } from "../ui/card";
import { MessageSquare } from "lucide-react";
import LikeButton from "./likeButton";
import UnlikeButton from "./unlikeButton";
import { userLikedAPost } from "@/lib/utils";

const CardFooterComponent = ({ post, currentUser }: any) => {
  const hasLiked = userLikedAPost(post, currentUser?.id || "");

  return (
    <CardFooter className="flex justify-between border-t py-2 sm:py-4">
      {hasLiked ? (
        <UnlikeButton post={post} currentUser={currentUser} />
      ) : (
        <LikeButton post={post} currentUser={currentUser} />
      )}
      <Link
        href={`/feed/${post.id}`}
        className="text-xs sm:text-sm flex items-center"
      >
        <MessageSquare className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
        Comment
      </Link>
    </CardFooter>
  );
};

export default CardFooterComponent;
