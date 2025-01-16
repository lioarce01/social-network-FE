import React, { useState } from "react";
import { Button } from "../ui/button";
import { useCreateCommentMutation } from "@/redux/api/commentApi";
import { Loader2 } from "lucide-react";

interface CreateCommentProps {
  currentUserId: string;
  postId: string;
}

const CreateComment: React.FC<CreateCommentProps> = ({
  currentUserId,
  postId,
}) => {
  const [content, setContent] = useState("");
  const [createComment, { isLoading: isCommentCreating }] =
    useCreateCommentMutation();

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createComment({
        userId: currentUserId,
        postId: postId,
        content: content.trim(),
      }).unwrap();
      setContent("");
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  return (
    <form onSubmit={handleCreateComment} className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring"
        />

        <Button
          type="submit"
          variant="default"
          size="sm"
          disabled={isCommentCreating || !content.trim()}
        >
          {isCommentCreating ? <Loader2 className="animate-spin" /> : "Post"}
        </Button>
      </div>
    </form>
  );
};

export default CreateComment;
