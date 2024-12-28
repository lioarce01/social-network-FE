import { useUpdatePostMutation } from "@/redux/api/postApi";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useCurrentUser from "@/hooks/useCurrentUser";

const EditPost = ({
  postId,
  initialContent,
  onClose,
}: {
  postId: string;
  initialContent: string;
  onClose: () => void;
}) => {
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [content, setContent] = useState(initialContent);
  const { currentUser } = useCurrentUser();

  const handleUpdatePost = async () => {
    if (!content.trim()) return;

    try {
      await updatePost({ id: postId, content }).unwrap();
      console.log("Post updated successfully:", postId);
      onClose();
    } catch (error) {
      console.error("Error updating post:", error);
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
                <p className="text-sm text-gray-500">Public</p>
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
            onClick={handleUpdatePost}
            disabled={isLoading}
            className="rounded-full bg-gray-100 border-gray-100 hover:bg-gray-200 hover:border-gray-200 transition-all duration-200"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
