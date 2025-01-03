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
import { useDeleteJobPostingMutation } from "@/redux/api/jobPostingApi";
import { useRouter } from "next/navigation";

const DeleteJobPosting = ({ jobId }: any) => {
  const [deleteJob] = useDeleteJobPostingMutation();
  const router = useRouter();

  const handleDeleteJob = async () => {
    try {
      await deleteJob(jobId)
        .unwrap()
        .finally(() => router.push("/jobpostings"));
      console.log("Post deleted successfully:", jobId);
    } catch (error) {
      console.error("Error deleting post:", error);
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
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDeleteJob}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteJobPosting;
