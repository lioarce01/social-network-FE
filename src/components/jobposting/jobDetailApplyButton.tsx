"use client";

import React from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useApplyJobMutation } from "@/redux/api/jobPostingApi";
import { hasApplied } from "@/lib/utils";

const ApplyButtonComponent = ({ jobDetails, userId }: any) => {
  const [applyJob, { isLoading: isApplying }] = useApplyJobMutation();

  const handleApplyJob = async () => {
    try {
      await applyJob({
        userId: userId,
        jobPostingId: jobDetails?.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const applied = hasApplied(userId, jobDetails);

  const getButtonLabel = () => {
    if (isApplying) return "Applying...";
    if (jobDetails?.status === "CLOSED") return "Closed";
    if (applied) return "Applied";
    return "Apply";
  };

  return (
    <>
      <div>
        <Button
          onClick={handleApplyJob}
          disabled={jobDetails?.status === "CLOSED" || applied}
          className="w-full sm:w-auto"
        >
          {getButtonLabel()}
        </Button>
      </div>
    </>
  );
};

export default ApplyButtonComponent;
