import React, { useState } from "react";
import { CardContent } from "../ui/card";

const CardContentComponent = ({ post }: any) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <CardContent className="max-w-full">
      <div
        className={`relative overflow-hidden ${
          expanded
            ? "max-h-none"
            : "max-h-[100px] sm:max-h-[150px] md:max-h-[200px]"
        }`}
      >
        <div className="whitespace-pre-wrap text-xs sm:text-sm md:text-base leading-relaxed text-neutral-800">
          {post.content}
        </div>
      </div>

      {!expanded && post.content.length > 200 && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-2 text-gray-600 hover:underline text-xs sm:text-sm"
        >
          See more
        </button>
      )}

      {expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="mt-2 text-gray-600 hover:underline text-xs sm:text-sm"
        >
          See less
        </button>
      )}
    </CardContent>
  );
};

export default CardContentComponent;
