import React from "react";
import JobListComponent from "@/components/jobposting/jobList";

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-background bg-gray-50">
      <header className="py-12 bg-gray-100 flex justify-center items-center">
        <div className="container max-w-2xl text-center px-4">
          <h1 className="text-3xl font-bold mb-4">
            Find Your Next Opportunity
          </h1>
          <p className="text-xl mb-8">
            Discover jobs that match your skills and passions.
          </p>
        </div>
      </header>

      <main className="py-4 flex justify-center">
        <JobListComponent />
      </main>
    </div>
  );
}
