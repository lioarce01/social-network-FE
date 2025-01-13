import React from "react";
import PostComments from "./postComments";
import CreateComment from "./createComment";
import { useGetPostCommentsQuery } from "@/redux/api/commentApi";
import { userLikedAPost } from "@/lib/utils";
import UnlikeButton from "./unlikeButton";
import LikeButton from "./likeButton";

interface CommentsProps {
  queryPost: any;
  currentUser: any;
}

const Comments: React.FC<CommentsProps> = ({ queryPost, currentUser }) => {
  const {
    data: postComments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useGetPostCommentsQuery(queryPost?.id, {
    skip: !queryPost?.id,
  });

  const hasLiked = userLikedAPost(queryPost, currentUser?.id || "");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {hasLiked ? (
          <UnlikeButton post={queryPost} currentUser={currentUser} />
        ) : (
          <LikeButton post={queryPost} currentUser={currentUser} />
        )}
        <div className="flex space-x-2">
          <h3 className="text-md font-medium">Comments</h3>
          <p className="text-gray-500 text-sm">{postComments?.length}</p>
        </div>
      </div>
      <PostComments comments={postComments} />
      <CreateComment />
    </div>
  );
};

export default Comments;
