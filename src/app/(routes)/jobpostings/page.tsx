import SearchBarComponent from "@/components/jobposting/searchBar";
import JobList from "@/components/jobposting/jobList";
import LoadMoreJobs from "@/components/jobposting/loadMoreJobs";

export default function JobsPage() {
  return (
    <div className="w-full min-h-screen flex justify-center p-4">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold mb-6">Find Your Next Opportunity</h1>

        <SearchBarComponent />

        <JobList />

        <LoadMoreJobs />
      </div>
    </div>
  );
}
