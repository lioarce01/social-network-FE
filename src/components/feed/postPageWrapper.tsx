"use client";
import React from "react";
import { useState } from "react";
import WritePostComponent from "./writePost";
import Posts from "./posts";

const PostPageWrapper = () => {
  const [refreshPosts, setRefreshPosts] = useState(false);

  const handlePostCreated = () => {
    setRefreshPosts((prev) => !prev);
  };
  return (
    <div className="w-full max-w-[700px] space-y-4 px-2 sm:px-4 md:px-6 lg:px-8">
      <WritePostComponent onPostCreated={handlePostCreated} />
      <Posts key={refreshPosts.toString()} onPostCreated={handlePostCreated} />
    </div>
  );
};

export default PostPageWrapper;
