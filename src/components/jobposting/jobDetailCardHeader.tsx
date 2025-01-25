import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CardHeaderDropdown from "./cardHeaderDropdown";

interface JobDetails {
  title: string;
  category: string;
  status: "OPEN" | "CLOSED";
  jobAuthorId: string;
  id: string;
}

interface JobDetailCardHeaderProps {
  jobDetails: JobDetails;
  currentUserId?: string;
  jobId: string;
}

const JobDetailCardHeader: React.FC<JobDetailCardHeaderProps> = ({
  jobDetails,
  currentUserId,
  jobId,
}) => {
  return (
    <CardHeader>
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div className="w-full sm:w-auto">
          <div className="flex justify-between items-center sm:block">
            <CardTitle className="text-3xl font-bold text-primary mb-2 sm:mb-0">
              {jobDetails.title}
            </CardTitle>
            <div className="sm:hidden">
              <CardHeaderDropdown jobDetails={jobDetails} jobId={jobId} />
            </div>
          </div>
          <p className="text-lg font-medium text-muted-foreground">
            {jobDetails.category}
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <Badge
            variant={jobDetails.status === "OPEN" ? "default" : "secondary"}
            className="text-sm font-semibold"
          >
            {jobDetails.status}
          </Badge>
          {jobDetails.jobAuthorId === currentUserId && (
            <div className="hidden sm:block">
              <CardHeaderDropdown jobDetails={jobDetails} jobId={jobId} />
            </div>
          )}
        </div>
      </div>
    </CardHeader>
  );
};

export default JobDetailCardHeader;
