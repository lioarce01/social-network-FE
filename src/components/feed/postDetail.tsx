import React from "react";
import Comments from "./comments";

interface PostDetailProps {
  queryPost: any;
  currentUser: any;
}

const PostDetail: React.FC<PostDetailProps> = ({ queryPost, currentUser }) => {
  const content = queryPost?.content || "Post content goes here...";

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="relative overflow-auto max-h-[400px] p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-800">
            {content}
          </div>
        </div>
      </div>
      <Comments queryPost={queryPost} currentUser={currentUser} />
    </div>
  );
};

export default PostDetail;
