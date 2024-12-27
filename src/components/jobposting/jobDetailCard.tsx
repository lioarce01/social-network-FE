"use client";
import React from "react";
import { Card } from "../ui/card";
import JobDetailCardHeader from "./jobDetailCardHeader";
import JobDetailCardContent from "./jobDetailCardComponent";
import ApplyButtonComponent from "./jobDetailApplyButton";
import { useParams } from "next/navigation";
import { useGetJobByIdQueryQuery } from "@/redux/api/jobPostingApi";

const JobDetailCardComponent = () => {
  const params = useParams();
  const jobId = params.id as string;

  const { data: jobDetails, isLoading, error } = useGetJobByIdQueryQuery(jobId);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
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
        <JobDetailCardHeader jobDetails={jobDetails && jobDetails} />
        <JobDetailCardContent jobDetails={jobDetails && jobDetails} />
        <ApplyButtonComponent />
      </Card>
    </>
  );
};

export default JobDetailCardComponent;
