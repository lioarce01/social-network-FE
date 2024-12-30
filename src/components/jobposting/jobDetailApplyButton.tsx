import React from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const ApplyButtonComponent = ({ jobDetails }: any) => {
  return (
    <>
      <CardFooter>
        <Button
          disabled={jobDetails?.status === "CLOSED"}
          className="w-full sm:w-auto"
        >
          {jobDetails?.status === "CLOSED" ? "Job Closed" : "Apply Now"}
        </Button>
      </CardFooter>
    </>
  );
};

export default ApplyButtonComponent;
