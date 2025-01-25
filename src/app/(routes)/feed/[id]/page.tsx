import PostDetailContentWrapper from "@/components/feed/postDetailContentWrapper";
import React from "react";

const PostDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = React.use(params);

  return (
    <div className="bg-gray-50 min-h-screen">
      <PostDetailContentWrapper id={resolvedParams?.id} />
    </div>
  );
};

export default PostDetailPage;
