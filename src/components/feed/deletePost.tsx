import { useDeletePostMutation } from "@/redux/api/postApi";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeletePost = ({ postId }: { postId: string }) => {
  const [deletePost] = useDeletePostMutation();

  const handleDeletePost = async () => {
    try {
      await deletePost({ id: postId }).unwrap();
      console.log("Post deleted successfully:", postId);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-left">Delete post</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDeletePost}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePost;
