import CreateJobPosting from "@/components/jobposting/createJobPosting";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CreateJobPostingPage = () => {
  return (
    <div className="pt-10 w-full px-4">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/jobpostings">← Back to Jobs</Link>
        </Button>
        <CreateJobPosting />;
      </div>
    </div>
  );
};

export default CreateJobPostingPage;
