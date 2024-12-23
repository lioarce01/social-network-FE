import React from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { MessageSquare, Share2, ThumbsUp } from "lucide-react";

const CardFooterComponent = ({ post }: any) => {
  return (
    <>
      <CardFooter className="flex justify-between border-t py-4">
        <Button variant="ghost" size="sm">
          <ThumbsUp className="mr-2 h-4 w-4" /> {post.likeCount} Likes
        </Button>
        <Button variant="ghost" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          Comment
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </CardFooter>
    </>
  );
};

export default CardFooterComponent;
