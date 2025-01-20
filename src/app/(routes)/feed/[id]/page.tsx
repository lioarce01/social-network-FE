import PostDetailContent from "@/components/feed/postDetailContent";
import React from "react";

const PostDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = React.use(params);

  return (
    <div className="bg-gray-50 min-h-screen">
      <PostDetailContent postId={resolvedParams?.id} />
    </div>
  );
};

export default PostDetailPage;
