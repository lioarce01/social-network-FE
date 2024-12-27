import React from "react";
import { CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

const JobDetailCardHeader = ({ jobDetails }: any) => {
  return (
    <>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-2xl mb-2 sm:mb-0">
              {jobDetails?.title}
            </CardTitle>
            <p className="text-lg text-muted-foreground">
              {jobDetails?.category}
            </p>
          </div>
          <Badge
            variant={jobDetails?.status === "OPEN" ? "default" : "secondary"}
          >
            {jobDetails?.status}
          </Badge>
        </div>
      </CardHeader>
    </>
  );
};

export default JobDetailCardHeader;
