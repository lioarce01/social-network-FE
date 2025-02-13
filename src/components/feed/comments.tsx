import type React from "react";
import { useEffect, useState, useCallback } from "react";
import PostComments from "./postComments";
import CreateComment from "./createComment";
import {
  useGetPostCommentsQuery,
  useLazyGetPostCommentsQuery,
} from "@/redux/api/commentApi";
import { userLikedAPost } from "@/lib/utils";
import UnlikeButton from "./unlikeButton";
import LikeButton from "./likeButton";
import { selectPostId } from "@/redux/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import {
  addComments,
  setComments,
  setTotalCount,
} from "@/redux/slices/commentSlice";
import { Button } from "@/components/ui/button";
import CommentSkeleton from "./commentSkeleton";
import useGetLikedPosts from "@/hooks/useGetLikedPosts";

interface CommentsProps {
  queryPost: any;
  currentUser: any;
}

const Comments: React.FC<CommentsProps> = ({ queryPost, currentUser }) => {
  const postId = useSelector(selectPostId);
  const dispatch = useDispatch<AppDispatch>();
  const { comments, totalCount } = useSelector(
    (state: RootState) => state.comments,
  );
  const { likedPosts, isLoading } = useGetLikedPosts();
  const [page, setPage] = useState(0);
  const INITIAL_COMMENTS = 2;
  const COMMENTS_PER_PAGE = 10;

  const {
    data: initial,
    isLoading: isLoadingInitial,
    isError: isInitialError,
  } = useGetPostCommentsQuery({
    postId,
    offset: 0,
    limit: INITIAL_COMMENTS,
  });

  const [
    triggerLoadMore,
    {
      data: paginated,
      isLoading: isLoadingPaginated,
      isError: isPaginatedError,
    },
  ] = useLazyGetPostCommentsQuery();

  const hasLiked = userLikedAPost(queryPost, likedPosts);

  useEffect(() => {
    if (initial && initial.comments) {
      dispatch(setComments(initial.comments));
      dispatch(setTotalCount(initial.totalCount));
    }
  }, [dispatch, initial]);

  useEffect(() => {
    if (paginated && paginated.comments) {
      dispatch(addComments(paginated.comments));
    }
  }, [dispatch, paginated]);

  const loadMoreComments = useCallback(() => {
    triggerLoadMore({
      postId,
      offset: INITIAL_COMMENTS + page * COMMENTS_PER_PAGE,
      limit: COMMENTS_PER_PAGE,
    });
    setPage((prevPage) => prevPage + 1);
  }, [triggerLoadMore, postId, page]);

  const hasMoreComments = comments.length < totalCount;

  if (isInitialError || isPaginatedError) {
    return (
      <div className="text-red-500">
        Error loading comments. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CreateComment postId={queryPost?.id} />
      <div className="flex items-center justify-between">
        {hasLiked ? (
          <UnlikeButton post={queryPost} currentUser={currentUser} />
        ) : (
          <LikeButton post={queryPost} currentUser={currentUser} />
        )}
        <div className="flex space-x-2">
          <h3 className="text-md font-medium">Comments</h3>
          <p className="text-gray-500 text-sm">{totalCount}</p>
        </div>
      </div>
      {isLoadingInitial ? (
        <CommentSkeleton />
      ) : (
        <>
          <PostComments comments={comments} currentUserId={currentUser?.id} />
          {hasMoreComments && (
            <div className="flex justify-center">
              <Button
                onClick={loadMoreComments}
                disabled={isLoadingPaginated}
                variant="outline"
                className="text-sm"
              >
                {isLoadingPaginated ? "Loading..." : "More Comments"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
