import type React from "react";
import { formatDate } from "@/lib/utils";
import CommentSettings from "./commentSettings";
import Link from "next/link";

interface PostCommentsProps {
  comments: any[];
  currentUserId: string;
}

const PostComments: React.FC<PostCommentsProps> = ({
  comments,
  currentUserId,
}) => {
  return (
    <div className="space-y-4 pr-2">
      {comments?.length > 0 ? (
        comments.map((comment: any) => (
          <div
            key={comment?.id}
            className="flex items-start space-x-4 p-3 border-muted"
          >
            <div className="flex-shrink-0">
              <img
                src={
                  comment?.author?.profile_pic ||
                  "https://via.placeholder.com/40" ||
                  "/placeholder.svg" ||
                  "/placeholder.svg"
                }
                alt="User Avatar"
                className="h-10 w-10 rounded-full"
              />
            </div>
            <div className="space-y-2 w-full">
              <div className="w-full">
                <div className="flex justify-between w-fulL">
                  <Link href={`/profile/${comment?.author?.id}`}>
                    <div className="flex flex-col">
                      <p className="font-medium text-primary">
                        {comment?.author?.name || "Anonymous"}
                      </p>
                      <p className="text-xs text-neutral-600">
                        {comment?.author?.current_position ||
                        comment?.author?.headline}
                      </p>
                    </div>
                  </Link>
                  <div className="flex items-center">
                    <p className="text-xs text-muted-foreground">
                      {formatDate(comment?.createdAt)}
                    </p>
                    {currentUserId === comment?.author?.id ? (
                      <CommentSettings comment={comment} />
                    ) : null}
                  </div>
                </div>
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
