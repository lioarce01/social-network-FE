import React from "react";
import Comments from "./comments";

interface PostDetailProps {
  queryPost: any;
  currentUser: any;
}

const PostDetail: React.FC<PostDetailProps> = ({ queryPost, currentUser }) => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm">
          {queryPost?.content || "Post content goes here..."}
        </p>
      </div>

      {/* Comments Section */}
      <Comments queryPost={queryPost} currentUser={currentUser} />
    </div>
  );
};

export default PostDetail;
