import React from "react";
import { Button } from "../ui/button";
import { HeartOff } from "lucide-react";
import { useUnlikePostMutation } from "@/redux/api/postApi";

const UnlikeButton = ({ post, currentUser }: any) => {
  const [unlikePost] = useUnlikePostMutation();
  const handleUnlikePost = async () => {
    await unlikePost({
      userId: currentUser?.id,
      postId: post.id,
    });
  };
  return (
    <>
      <>
        <Button onClick={handleUnlikePost} variant="ghost" size="sm">
          <HeartOff className="mr-2 h-4 w-4 " /> {post.likeCount} Likes
        </Button>
      </>
    </>
  );
};

export default UnlikeButton;
