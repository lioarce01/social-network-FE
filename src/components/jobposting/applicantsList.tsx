"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useGetJobApplicantsQuery } from "@/redux/api/jobPostingApi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import RejectApplicant from "./rejectApplicant";

interface Applicant {
  id: string;
  isRejected: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    profile_pic: string;
  };
}

const ApplicantsList = () => {
  const { id } = useParams() as { id: string };
  const { data, error, isLoading } = useGetJobApplicantsQuery(
    { id },
    {
      skip: !id,
    },
  );

  const dialogTrigger = (
    <DialogTrigger asChild>
      <button className="w-full justify-start">Applicants List</button>
    </DialogTrigger>
  );

  if (isLoading) {
    return (
      <Dialog>
        {dialogTrigger}
        <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Applicants List</DialogTitle>
            <DialogDescription>Loading applicants...</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog>
        {dialogTrigger}
        <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Applicants List</DialogTitle>
            <DialogDescription>
              There was an error loading applicants.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      {dialogTrigger}
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Applicants List</DialogTitle>
          <DialogDescription>
            List of applicants for this job posting
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {data?.jobApplicants?.applications && data?.jobApplicants?.applications.length > 0 ? (
            data?.jobApplicants?.applications.map((applicant: Applicant) => (
              <div
                key={applicant.user?.id}
                className="mb-4 p-4 border-b last:border-b-0 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={applicant.user?.profile_pic}
                      alt={applicant.user?.name}
                    />
                    <AvatarFallback>{applicant.user?.name}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{applicant.user?.name}</p>
                    <p className="text-sm text-gray-500">
                      {applicant.user?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/profile/${applicant.user?.id}`}
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    View Profile
                  </Link>
                  <RejectApplicant
                    userId={applicant.user?.id}
                    id={id}
                    isRejected={applicant.isRejected}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No applicants yet</p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicantsList;
