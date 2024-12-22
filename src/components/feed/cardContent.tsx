import React from "react";
import { CardContent } from "../ui/card";

const CardContentComponent = ({ post }: any) => {
  return (
    <>
      <CardContent>
        <p className="mb-4">{post.content}</p>
      </CardContent>
    </>
  );
};

export default CardContentComponent;
