"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPostId,
  resetPostState,
  setLoading,
  selectPostId,
} from "@/redux/slices/postSlice";
import PostDetailContent from "@/components/feed/postDetailContent";

interface PostDetailContentWrapperProps {
  id: string;
}

const PostDetailContentWrapper: React.FC<PostDetailContentWrapperProps> = ({
  id,
}) => {
  const dispatch = useDispatch();
  const postId = useSelector(selectPostId);

  useEffect(() => {
    if (postId !== id) {
      dispatch(setLoading(true));
      dispatch(resetPostState());
      dispatch(setPostId(id));
    }
  }, [dispatch, id, postId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);

    return () => clearTimeout(timeout);
  }, [id, dispatch]);

  return <PostDetailContent />;
};

export default PostDetailContentWrapper;
