import React from "react";
import { Card } from "../ui/card";
import CardHeaderComponent from "./cardHeader";
import CardContentComponent from "./cardContent";
import CardFooterComponent from "./cardFooter";

const PostCard = ({ post }: any) => {
  return (
    <Card className="bg-white w-full sm:max-w-[600px] mx-auto">
      <CardHeaderComponent post={post} />
      <CardContentComponent post={post} />
      <CardFooterComponent post={post} />
    </Card>
  );
};

export default PostCard;
