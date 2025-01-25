import { formatDate } from "@/lib/utils";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { CardHeader } from "../ui/card";
import PostSettingsComponent from "./postSettings";
import Link from "next/link";

const CardHeaderComponent = ({ post }: any) => {
  return (
    <>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={post.author.profile_pic}
              alt={post.author?.name}
            />
          </Avatar>
          <div>
            <Link href={`/profile/${post.author?.id}`} className="font-bold">
              {post.author?.name}
            </Link>
            <p className="text-sm text-gray-500">
              {post.author?.current_position || post.author?.headline}
            </p>
            <p className="text-sm text-gray-500">
              {formatDate(post.updatedAt)}
            </p>
          </div>
        </div>
        <div>
          <PostSettingsComponent post={post} />
        </div>
      </CardHeader>
    </>
  );
};

export default CardHeaderComponent;
