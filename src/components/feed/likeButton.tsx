import React from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { useLikePostMutation } from "@/redux/api/postApi";
import { useDispatch } from "react-redux";

const LikeButton = ({ post }: any) => {
  const [likePost, { isLoading }] = useLikePostMutation();

  const handleLikePost = async () => {
    await likePost({
      postId: post.id,
    }).unwrap();
  };
  return (
    <>
      <Button
        disabled={isLoading}
        onClick={handleLikePost}
        variant="ghost"
        size="sm"
      >
        <Heart className="h-4 w-4" /> 
      </Button>
    </>
  );
};

export default LikeButton;
