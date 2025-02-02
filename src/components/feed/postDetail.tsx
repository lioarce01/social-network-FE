import React from "react";
import Comments from "./comments";
import { CardHeader } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import PostSettingsComponent from "./postSettings";

interface PostDetailProps {
  queryPost: any;
  currentUser: any;
}

const PostDetail: React.FC<PostDetailProps> = ({ queryPost, currentUser }) => {
  const content = queryPost?.content || "Post content goes here...";
  const author = queryPost?.author;

  if (!queryPost || !author) {
    return <div>Post not found</div>;
  }

  return (
    <div className="space-y-2">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center space-x-4">
          <Avatar>
            <AvatarImage src={author.profile_pic} alt={author.name} />
          </Avatar>
          <div>
            <Link href={`/profile/${author.id}`} className="font-bold">
              {author.name}
            </Link>
            <p className="text-sm text-gray-500">
              {author.current_position || author.headline}
            </p>
            <p className="text-sm text-gray-500">
              {formatDate(queryPost.createdAt)}
            </p>
          </div>
        </div>
        <div>
          <PostSettingsComponent post={queryPost} />
        </div>
      </CardHeader>
      <div className="space-y-2">
        <div className="min-h-[100px] px-4 bg-white">
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
