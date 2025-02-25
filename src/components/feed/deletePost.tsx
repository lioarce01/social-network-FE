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
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { updatePost } from "@/redux/slices/postSlice";

const DeletePost = ({ postId }: { postId: string }) => {
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDeletePost = async () => {
    try {
      const updatedPost = await deletePost({ id: postId }).unwrap();
      console.log("Post deleted successfully:", postId);
      router.push("/feed");
      dispatch(updatePost(updatedPost));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-left text-red-500">Delete</button>
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
          <Button
            disabled={isDeleting}
            variant="destructive"
            onClick={handleDeletePost}
          >
            {isDeleting ? <Loader2 className="animate-spin" /> : "Delete post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePost;
