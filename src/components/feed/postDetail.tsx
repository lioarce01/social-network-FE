import React from "react";
import { Button } from "../ui/button";
import { formatDate } from "@/lib/utils";

interface PostDetailProps {
  queryPost: any;
}

const PostDetail: React.FC<PostDetailProps> = ({ queryPost }) => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          {queryPost?.content || "Post content goes here..."}
        </p>
      </div>

      {/* Comments Section */}
      <div className="space-y-4">
        <h3 className="text-md font-medium">Comments</h3>
        {queryPost?.comments?.length ? (
          queryPost.comments.map((comment: any, index: number) => (
            <div key={index} className="flex items-start space-x-4">
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
              <div>
                <p className="font-medium">
                  {comment?.author?.name || "Anonymous"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {comment?.content || "No comment content."}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        )}
        {/* Input for adding a comment */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring"
          />
          <Button variant="default" size="sm">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
