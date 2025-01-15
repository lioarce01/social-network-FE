import React from "react";
import { formatDate } from "@/lib/utils";
import CommentSettings from "./commentSettings";

interface PostCommentsProps {
  comments: any;
  currentUserId: string;
}

const PostComments: React.FC<PostCommentsProps> = ({
  comments,
  currentUserId,
}) => {
  const sortedComments = comments?.slice().sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
      {sortedComments?.length > 0 ? (
        sortedComments.map((comment: any) => (
          <div
            key={comment?.id}
            className="flex items-start space-x-4 p-3 border border-muted bg-gray-50 rounded-sm"
          >
            <div className="flex-shrink-0">
              <img
                src={
                  comment?.author?.profile_pic ||
                  "https://via.placeholder.com/40"
                }
                alt="User Avatar"
                className="h-10 w-10 rounded-full"
              />
            </div>
            <div className="space-y-2 w-full">
              <div className="w-full">
                <div className="flex justify-between w-full">
                  <p className="font-medium text-primary">
                    {comment?.author?.name || "Anonymous"}
                  </p>
                  {currentUserId === comment?.author?.id ? (
                    <CommentSettings commentId={comment?.id} />
                  ) : null}
                </div>

                <p className="text-xs text-muted-foreground">
                  {formatDate(comment?.createdAt)}
                </p>
              </div>

              <p className="text-sm text-gray-900 font-sm">
                {comment?.content || "No comment content."}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">No comments yet.</p>
      )}
    </div>
  );
};

export default PostComments;
