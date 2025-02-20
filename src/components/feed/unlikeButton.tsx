import React from "react";
import { Button } from "../ui/button";
import { HeartOff } from "lucide-react";
import { useUnlikePostMutation } from "@/redux/api/postApi";

const UnlikeButton = ({ post }: any) => {
  const [unlikePost, { isLoading }] = useUnlikePostMutation();

  const handleUnlikePost = async () => {
    await unlikePost({
      postId: post.id,
    }).unwrap();
  };
  return (
    <>
      <>
        <Button
          disabled={isLoading}
          onClick={handleUnlikePost}
          variant="ghost"
          size="sm"
        >
          <HeartOff className="mr-2 h-4 w-4 " /> {post.likeCount} Likes
        </Button>
      </>
    </>
  );
};

export default UnlikeButton;
