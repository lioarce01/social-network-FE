import { useDeletePostMutation } from "@/redux/api/postApi";
import React from "react";

const DeletePost = ({ postId }: any) => {
  const [deletePost] = useDeletePostMutation();

  const handleDeletePost = async () => {
    try {
      await deletePost({
        id: postId,
      });
      console.log("Post deleted successfully with id:", postId);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <button onClick={handleDeletePost} className="w-full text-left">
        Delete post
      </button>
    </>
  );
};

export default DeletePost;
