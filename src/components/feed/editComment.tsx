import React, { useState } from "react";
import { useUpdateCommentMutation } from "@/redux/api/commentApi";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import useCurrentUser from "@/hooks/useCurrentUser";

interface EditCommentProps {
  commentId: string;
  initialContent: string;
  onClose: () => void;
}

const EditComment: React.FC<EditCommentProps> = ({
  commentId,
  initialContent,
  onClose,
}) => {
  const [updateComment, { isLoading: isUpdating }] = useUpdateCommentMutation();
  const [content, setContent] = useState(initialContent);
  const { currentUser } = useCurrentUser();

  const handleUpdateComment = async () => {
    if (!content.trim()) return;

    try {
      await updateComment({ id: commentId, content }).unwrap();
      console.log("Comment updated successfully:", commentId);
      onClose;
    } catch (e) {
      console.error("Error updateing comment:", e);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-3">
              <img
                src={currentUser?.profile_pic}
                alt="Profile"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">
                  {currentUser?.name || "User Name"}
                </p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mt-4 resize-none bg-transparent border-none focus:outline-none text-lg placeholder:text-gray-500"
          rows={5}
          placeholder="Edit your post..."
        />

        <DialogFooter className="border-t pt-2">
          <Button
            variant="outline"
            onClick={handleUpdateComment}
            disabled={isUpdating}
            className="rounded-full bg-gray-100 border-gray-100 hover:bg-gray-200 hover:border-gray-200 transition-all duration-200"
          >
            {isUpdating ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditComment;
