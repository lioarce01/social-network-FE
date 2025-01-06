"use client";

import React from "react";
import { MoreHorizontal, Edit, Trash, Eye, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteJobPosting from "./deleteJobPosting";
import SwitchJobPostingStatus from "./switchJobPostingStatus";
import Link from "next/link";
import ApplicantsList from "./applicantsList";

interface CardHeaderDropdownProps {
  jobDetails: any;
  jobId: string;
}

const CardHeaderDropdown: React.FC<CardHeaderDropdownProps> = ({
  jobDetails,
  jobId,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          {/* EDIT JOB POSTING */}
          <Link className="w-full" href={`${jobId}/update`}>
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {/* SWITCH STATUS JOB POSTING */}
          <SwitchJobPostingStatus jobId={jobId} jobDetails={jobDetails} />
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          {/* APPLICANTS LIST MODAL */}
          <ApplicantsList jobId={jobId} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-red-600"
        >
          {/* DELETE JOB POSTING */}
          <DeleteJobPosting jobId={jobId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardHeaderDropdown;
