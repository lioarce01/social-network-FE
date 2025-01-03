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

const JobDetailCardContent = ({ jobDetails }: any) => {
  return (
    <>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center">
            <DollarSign className="mr-1 h-4 w-4" /> Budget: $
            {jobDetails?.budget}
          </span>
          <span className="flex items-center">
            <CalendarDays className="mr-1 h-4 w-4" /> Deadline:{" "}
            {formatDateTime(jobDetails?.deadline)}
          </span>
          <span className="flex items-center">
            <Clock className="mr-1 h-4 w-4" /> Posted:{" "}
            {formatDate(jobDetails?.createdAt)}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center">
            <MapPin className="mr-1 h-4 w-4" /> Location: {jobDetails?.location}
          </span>
          <span className="flex items-center">
            <Briefcase className="mr-1 h-4 w-4" /> Mode: {jobDetails?.mode}
          </span>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Job Description</h3>
          <p>{jobDetails?.description}</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Required Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {jobDetails.techRequired.map((tech: string, index: number) => (
              <Badge
                key={index}
                variant="outline"
                className="flex items-center"
              >
                <Tag className="mr-1 h-3 w-3" /> {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default JobDetailCardContent;
