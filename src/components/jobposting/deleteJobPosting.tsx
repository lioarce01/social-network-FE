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
import { Loader2 } from "lucide-react";

const DeleteJobPosting = ({ jobId }: any) => {
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobPostingMutation();
  const router = useRouter();

  const handleDeleteJob = async () => {
    try {
      await deleteJob(jobId).unwrap();
      router.push("/jobpostings");
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
            Are you sure you want to delete this job post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDeleteJob}
            disabled={isDeleting}
          >
            {isDeleting ? <Loader2 className="animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteJobPosting;
