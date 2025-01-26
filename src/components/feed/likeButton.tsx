import React from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { useLikePostMutation } from "@/redux/api/postApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updatePost } from "@/redux/slices/postSlice";

const LikeButton = ({ post, currentUser }: any) => {
  const [likePost, { isLoading }] = useLikePostMutation();
  const dispatch = useDispatch<AppDispatch>();

  const handleLikePost = async () => {
    const updatedPost = await likePost({
      userId: currentUser?.id,
      postId: post.id,
    }).unwrap();

    dispatch(updatePost(updatedPost));
  };
  return (
    <>
      <Button
        disabled={isLoading}
        onClick={handleLikePost}
        variant="ghost"
        size="sm"
      >
        <Heart className="mr-2 h-4 w-4" /> {post.likeCount} Likes
      </Button>
    </>
  );
};

export default LikeButton;
