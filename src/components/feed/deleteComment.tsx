import { useDeleteCommentMutation } from "@/redux/api/commentApi";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface DeleteCommentProps {
  commentId: string;
}

const DeleteComment: React.FC<DeleteCommentProps> = ({ commentId }) => {
  const [deleteComment, { isLoading: isDeleting, isError: isDeletingError }] =
    useDeleteCommentMutation();

  const deleteCommentHandler = async () => {
    try {
      await deleteComment({
        id: commentId,
      }).unwrap();
      console.log("Deleting comment with id:", commentId);
    } catch (e) {
      console.error("Error deleting comment:", e);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-left">Delete</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={deleteCommentHandler}
            disabled={isDeleting}
          >
            {isDeleting ? <Loader2 className="animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteComment;
