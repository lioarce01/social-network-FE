import { formatDate } from "@/lib/utils";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { CardHeader } from "../ui/card";

const CardHeaderComponent = ({ post }: any) => {
  return (
    <>
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar>
          <AvatarImage src={post.author?.profile_pic} alt={post.author?.name} />
        </Avatar>
        <div>
          <h3 className="font-bold">{post.author?.name}</h3>
          <p className="text-sm text-gray-500">
            Senior Software Engineer at TechCorp
          </p>
          <p className="text-sm text-gray-500">{formatDate(post.updatedAt)}</p>
        </div>
      </CardHeader>
    </>
  );
};

export default CardHeaderComponent;
