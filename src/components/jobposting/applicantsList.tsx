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
import { format } from "date-fns";
import Link from "next/link";

interface Applicant {
  id: string;
  userId: string;
  jobPostingId: string;
  appliedAt: string;
}

interface ApplicantsListProps {
  jobDetails: {
    applicants: Applicant[];
  };
}

const ApplicantsList: React.FC<ApplicantsListProps> = ({ jobDetails }) => {
  const { applicants } = jobDetails;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full justify-start">Applicants List</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Applicants List</DialogTitle>
          <DialogDescription>
            List of applicants for this job posting
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {applicants.length > 0 ? (
            applicants.map((applicant) => (
              <div
                key={applicant.id}
                className="mb-4 p-2 border-b last:border-b-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Link
                      href={`/profile/${applicant.userId}`}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      View Profile
                    </Link>
                    <p className="text-xs text-gray-500">
                      User ID: {applicant.userId}
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Reject
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Applied on:{" "}
                  {format(new Date(applicant.appliedAt), "PPP 'at' p")}
                </p>
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
