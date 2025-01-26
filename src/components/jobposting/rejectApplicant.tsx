"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRejectApplicantMutation } from "@/redux/api/jobPostingApi";
import { Loader2 } from "lucide-react";

interface RejectApplicantProps {
  userId: string;
  id: string;
  isRejected: boolean;
}

const RejectApplicant = ({ userId, id, isRejected }: RejectApplicantProps) => {
  const [rejectApplicant, { isLoading: isRejecting }] =
    useRejectApplicantMutation();

  const handleRejectApplicant = async () => {
    try {
      await rejectApplicant({ id, userId }).unwrap();
    } catch (error) {
      console.error("Error rejecting applicant:", error);
    }
  };
  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleRejectApplicant}
        disabled={isRejecting || isRejected}
      >
        {isRejecting && !isRejected ? (
          <Loader2 className="animate-spin" />
        ) : isRejected ? (
          "Rejected"
        ) : (
          "Reject"
        )}
      </Button>
    </>
  );
};

export default RejectApplicant;
