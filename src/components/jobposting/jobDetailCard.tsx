"use client";
import React from "react";
import { Card } from "../ui/card";
import JobDetailCardContent from "./jobDetailCardComponent";
import ApplyButtonComponent from "./jobDetailApplyButton";
import { useParams } from "next/navigation";
import { useGetJobByIdQueryQuery } from "@/redux/api/jobPostingApi";
import useCurrentUser from "@/hooks/useCurrentUser";
import JobDetailSkeleton from "./jobDetailSkeleton";
import JobDetailCardHeader from "./jobDetailCardHeader";

const JobDetailCardComponent = () => {
  const params = useParams();
  const jobId = params.id as string;
  const { currentUser } = useCurrentUser();

  const {
    data: jobDetails,
    isLoading,
    error,
  } = useGetJobByIdQueryQuery(jobId, { refetchOnMountOrArgChange: true });

  if (isLoading) {
    return <JobDetailSkeleton />;
  }

  if (error || !jobDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        Job not found
      </div>
    );
  }
  return (
    <>
      <Card>
        <JobDetailCardHeader
          jobDetails={jobDetails && jobDetails}
          currentUserId={currentUser?.id}
          jobId={jobId}
        />
        <JobDetailCardContent jobDetails={jobDetails && jobDetails} />
        <ApplyButtonComponent
          jobDetails={jobDetails && jobDetails}
          userId={currentUser?.id}
        />
      </Card>
    </>
  );
};

export default JobDetailCardComponent;
