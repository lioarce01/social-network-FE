import React from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { MessageSquare, Share2, ThumbsUp } from "lucide-react";
import LikeButton from "./likeButton";
import UnlikeButton from "./unlikeButton";
import { userLikedAPost } from "@/lib/utils";
import { useGetPostByIdQuery } from "@/redux/api/postApi";

const CardFooterComponent = ({ post, currentUser }: any) => {
  const { data: queryPost, isLoading, error } = useGetPostByIdQuery(post?.id);
  const hasLiked = userLikedAPost(queryPost, currentUser?.id || "");

  return (
    <>
      <CardFooter className="flex justify-between border-t py-4">
        {hasLiked ? (
          <UnlikeButton post={post} currentUser={currentUser} />
        ) : (
          <LikeButton post={post} currentUser={currentUser} />
        )}
        <Button variant="ghost" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          Comment
        </Button>
      </CardFooter>
    </>
  );
};

export default CardFooterComponent;
