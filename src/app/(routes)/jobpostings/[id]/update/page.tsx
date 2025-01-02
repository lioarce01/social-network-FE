"use client";

import React from "react";
import EditJobPosting from "@/components/jobposting/editJobPosting";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EditJobPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);

  return (
    <div className="w-full p-4">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" asChild className="mb-6">
          <Link href={`/jobpostings/${resolvedParams.id}`}>
            ← Back to Job Details
          </Link>
        </Button>

        <div className="w-full flex justify-center">
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%]">
            <EditJobPosting jobId={resolvedParams.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
