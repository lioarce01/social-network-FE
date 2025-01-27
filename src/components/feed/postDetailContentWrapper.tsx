"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPostId, resetPostState } from "@/redux/slices/postSlice";
import PostDetailContent from "@/components/feed/postDetailContent";

interface PostDetailContentWrapperProps {
  id: string;
}

const PostDetailContentWrapper: React.FC<PostDetailContentWrapperProps> = ({
  id,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetPostState());
    dispatch(setPostId(id));
  }, [dispatch, id]);

  return <PostDetailContent />;
};

export default PostDetailContentWrapper;
