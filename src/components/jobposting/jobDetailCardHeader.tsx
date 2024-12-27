import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CardHeaderDropdown from "./cardHeaderDropdown";

interface JobDetails {
  title: string;
  category: string;
  status: "OPEN" | "CLOSED";
  jobAuthorId: string;
}

interface JobDetailCardHeaderProps {
  jobDetails: JobDetails;
  onEdit?: () => void;
  onDelete?: () => void;
  onChangeStatus?: (status: "OPEN" | "CLOSED") => void;
  currentUserId?: string;
}

const JobDetailCardHeader: React.FC<JobDetailCardHeaderProps> = ({
  jobDetails,
  onEdit,
  onDelete,
  onChangeStatus,
  currentUserId,
}) => {
  return (
    <CardHeader>
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div className="w-full sm:w-auto">
          <div className="flex justify-between items-center sm:block">
            <CardTitle className="text-2xl mb-2 sm:mb-0">
              {jobDetails.title}
            </CardTitle>
            <div className="sm:hidden">
              <CardHeaderDropdown
                onEdit={onEdit}
                onDelete={onDelete}
                onChangeStatus={onChangeStatus}
              />
            </div>
          </div>
          <p className="text-lg text-muted-foreground">{jobDetails.category}</p>
        </div>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <Badge
            variant={jobDetails.status === "OPEN" ? "default" : "secondary"}
          >
            {jobDetails.status}
          </Badge>
          {jobDetails.jobAuthorId === currentUserId && (
            <div className="hidden sm:block">
              <CardHeaderDropdown
                onEdit={onEdit}
                onDelete={onDelete}
                onChangeStatus={onChangeStatus}
              />
            </div>
          )}
        </div>
      </div>
    </CardHeader>
  );
};

export default JobDetailCardHeader;
