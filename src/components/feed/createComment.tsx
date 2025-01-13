import React from "react";
import { Button } from "../ui/button";

const CreateComment = () => {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring"
        />
        <Button variant="default" size="sm">
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreateComment;
