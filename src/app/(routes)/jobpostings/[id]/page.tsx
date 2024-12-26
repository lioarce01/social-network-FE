"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, DollarSign, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { useGetJobByIdQueryQuery } from "@/redux/api/jobPostingApi";
import { formatDateTime } from "@/lib/utils";

export default function JobDetails() {
  const params = useParams();
  const jobId = params.id as string;

  const { data: jobDetails, isLoading, error } = useGetJobByIdQueryQuery(jobId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error || !jobDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        Job not found
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/jobpostings">← Back to Jobs</Link>
        </Button>

        <div className="w-full flex justify-center">
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%]">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <CardTitle className="text-2xl mb-2 sm:mb-0">
                      {jobDetails.title}
                    </CardTitle>
                    <p className="text-lg text-muted-foreground">
                      {jobDetails.category}
                    </p>
                  </div>
                  <Badge
                    variant={
                      jobDetails.status === "OPEN" ? "default" : "secondary"
                    }
                  >
                    {jobDetails.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4" /> Budget:{" "}
                    {jobDetails.budget}
                  </span>
                  <span className="flex items-center">
                    <CalendarDays className="mr-1 h-4 w-4" /> Deadline:{" "}
                    {formatDateTime(jobDetails.deadline)}
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" /> Posted:{" "}
                    {formatDateTime(jobDetails.createdAt)}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Job Description
                  </h3>
                  <p>{jobDetails.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Required Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {jobDetails.techRequired.map((tech: any, index: any) => (
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
              <CardFooter>
                <Button className="w-full sm:w-auto">Apply Now</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
