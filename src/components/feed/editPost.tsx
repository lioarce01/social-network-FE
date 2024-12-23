import { useUpdatePostMutation } from "@/redux/api/postApi";
import React from "react";

const EditPost = ({ postId }: any) => {
  const [updatePost] = useUpdatePostMutation();
  return (
    <>
      <button className="w-full text-left">Edit post</button>
    </>
  );
};

export default EditPost;
