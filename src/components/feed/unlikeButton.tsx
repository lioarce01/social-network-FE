import React from "react";
import { Button } from "../ui/button";
import { HeartOff } from "lucide-react";
import { useUnlikePostMutation } from "@/redux/api/postApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updatePost } from "@/redux/slices/postSlice";

const UnlikeButton = ({ post, currentUser }: any) => {
  const [unlikePost, { isLoading }] = useUnlikePostMutation();
  const dispatch = useDispatch<AppDispatch>();

  const handleUnlikePost = async () => {
    const updatedPost = await unlikePost({
      userId: currentUser?.id,
      postId: post.id,
    }).unwrap();

    dispatch(updatePost(updatedPost));
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
