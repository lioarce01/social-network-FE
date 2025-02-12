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

  console.log("post:",post)

  const hasLiked = userLikedAPost(post, likedPosts);

  console.log(hasLiked)

  const userLikedPost = () => {
    if (hasLiked) {
      return (
        <div className="flex items-center justify-center">
          <UnlikeButton post={post}/>
          <p className="text-xs">{post.likeCount} Likes</p>
        </div>
      )
    } else {
      return (
        <div className="flex items-center justify-center">
          <LikeButton post={post}/>
          <p className="text-xs">{post.likeCount} Likes</p>
        </div>
      )
    }
  }

  return (
    <CardFooter className="flex justify-between border-t py-2 sm:py-4">
      {userLikedPost()}
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
