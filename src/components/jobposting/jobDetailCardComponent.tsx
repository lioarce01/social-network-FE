import React from "react";
import { CardContent } from "../ui/card";
import {
  Briefcase,
  CalendarDays,
  Clock,
  DollarSign,
  MapPin,
  Tag,
} from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/utils";
import { Badge } from "../ui/badge";
import ApplyButtonComponent from "./jobDetailApplyButton";

const JobDetailCardContent = ({ jobDetails, currentUserId }: any) => {
  const formatDescription = (text: string) => {
    const lines = text.split("\n");

    return lines.map((line, index) => {
      if (line.trim().startsWith("-") || line.trim().startsWith("•")) {
        return (
          <li key={index} className="ml-6 list-disc">
            {line.trim().substring(1).trim()}
          </li>
        );
      }

      if (line.trim() === "") {
        return <div key={index} className="h-4" />;
      }

      return (
        <p key={index} className="mb-4">
          {line}
        </p>
      );
    });
  };

  return (
    <CardContent className="space-y-6">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm font-medium text-muted-foreground">
        <span className="flex items-center">
          <DollarSign className="mr-1 h-4 w-4 text-primary" /> Budget: $
          {jobDetails?.budget}
        </span>
        <span className="flex items-center">
          <CalendarDays className="mr-1 h-4 w-4 text-primary" /> Deadline:{" "}
          {formatDateTime(jobDetails?.deadline)}
        </span>
        <span className="flex items-center">
          <Clock className="mr-1 h-4 w-4 text-primary" /> Posted:{" "}
          {formatDate(jobDetails?.createdAt)}
        </span>
      </div>

      <div className="flex flex-col  sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm font-medium text-muted-foreground">
        <span className="flex items-center">
          <MapPin className="mr-1 h-4 w-4 text-primary" /> Location:{" "}
          {jobDetails?.location}
        </span>
        <span className="flex items-center">
          <Briefcase className="mr-1 h-4 w-4 text-primary" /> Mode:{" "}
          {jobDetails?.mode}
        </span>
      </div>
      <ApplyButtonComponent
        jobDetails={jobDetails && jobDetails}
        userId={currentUserId}
      />

      <div>
        <h3 className="font-semibold text-xl text-primary mb-4">
          Job Description
        </h3>
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-line">
            {formatDescription(jobDetails?.description)}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-xl text-primary mb-2">
          Required Technologies
        </h3>
        <div className="flex flex-wrap gap-2">
          {jobDetails.techRequired.map((tech: string, index: number) => (
            <Badge
              key={index}
              variant="outline"
              className="flex items-center bg-secondary text-secondary-foreground"
            >
              <Tag className="mr-1 h-3 w-3" /> {tech}
            </Badge>
          ))}
        </div>
      </div>
    </CardContent>
  );
};

export default JobDetailCardContent;
