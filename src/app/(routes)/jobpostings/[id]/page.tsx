import { Button } from "@/components/ui/button";

import Link from "next/link";
import JobDetailCardComponent from "@/components/jobposting/jobDetailCard";

export default function JobDetails() {
  return (
    <div className="w-full p-4">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/jobpostings">← Back to Jobs</Link>
        </Button>

        <div className="w-full flex justify-center">
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%]">
            <JobDetailCardComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
