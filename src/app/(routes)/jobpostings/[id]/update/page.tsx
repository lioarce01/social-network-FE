"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import EditJobPosting from "@/components/jobposting/editJobPosting";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// const EditJobPage: React.FC = () => {
//   const params = useParams();
//   const jobId = Array.isArray(params.id) ? params.id[0] : params.id || "";

//   return (
//     <div className="w-full p-4">
//       <div className="max-w-7xl mx-auto">
//         <Button variant="ghost" asChild className="mb-6">
//           <Link href="/jobpostings">← Back to Jobs</Link>
//         </Button>

//         <div className="w-full flex justify-center">
//           <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%]">
//             <h1 className="text-2xl font-bold mb-4">Edit Job Posting</h1>
//             <EditJobPosting jobId={jobId} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditJobPage;

export default function EditJobPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  return <EditJobPosting jobId={resolvedParams.id} />;
}
