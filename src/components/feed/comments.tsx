import React, { useEffect, useState } from "react";
import PostComments from "./postComments";
import CreateComment from "./createComment";
import { useGetPostCommentsQuery } from "@/redux/api/commentApi";
import { userLikedAPost } from "@/lib/utils";
import UnlikeButton from "./unlikeButton";
import LikeButton from "./likeButton";
import { selectPostId } from "@/redux/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  addComments,
  selectAllComments,
  selectTotalCommentsCount,
  setComments,
  setTotalCount,
} from "@/redux/slices/commentSlice";

interface CommentsProps {
  queryPost: any;
  currentUser: any;
}

const Comments: React.FC<CommentsProps> = ({ queryPost, currentUser }) => {
  const postId = useSelector(selectPostId);
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector(
    (state: RootState) => selectAllComments(state) || [],
  );
  const totalCount = useSelector(
    (state: RootState) => selectTotalCommentsCount(state) || 0,
  );
  const [queryParams, setQueryParams] = useState({
    offset: 0,
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const {
    data,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useGetPostCommentsQuery({ postId, ...queryParams });

  const hasLiked = userLikedAPost(queryPost, currentUser?.id || "");

  useEffect(() => {
    if (data && data.comments) {
      if (queryParams.offset === 0) {
        dispatch(setComments(data.comments));
      } else {
        dispatch(addComments(data.comments));
      }
      dispatch(setTotalCount(data.totalCount));
    }
  }, [data, dispatch, queryParams.offset]);

  return (
    <div className="space-y-4">
      <CreateComment currentUserId={currentUser?.id} postId={queryPost?.id} />
      <div className="flex items-center justify-between">
        {hasLiked ? (
          <UnlikeButton post={queryPost} currentUser={currentUser} />
        ) : (
          <LikeButton post={queryPost} currentUser={currentUser} />
        )}
        <div className="flex space-x-2">
          <h3 className="text-md font-medium">Comments</h3>
          <p className="text-gray-500 text-sm">{comments?.length}</p>
        </div>
      </div>
      <PostComments comments={comments} currentUserId={currentUser?.id} />
    </div>
  );
};

export default Comments;
