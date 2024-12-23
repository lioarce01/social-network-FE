import React from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { useLikePostMutation } from "@/redux/api/postApi";

const LikeButton = ({ post, currentUser }: any) => {
  const [likePost] = useLikePostMutation();

  const handleLikePost = async () => {
    await likePost({
      userId: currentUser?.id,
      postId: post.id,
    });
  };
  return (
    <>
      <Button onClick={handleLikePost} variant="ghost" size="sm">
        <Heart className="mr-2 h-4 w-4" /> {post.likeCount} Likes
      </Button>
    </>
  );
};

export default LikeButton;
