import React from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const ApplyButtonComponent = () => {
  return (
    <>
      <CardFooter>
        <Button className="w-full sm:w-auto">Apply Now</Button>
      </CardFooter>
    </>
  );
};

export default ApplyButtonComponent;
