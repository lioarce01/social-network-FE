import SearchBarComponent from "@/components/jobposting/searchBar";
import JobList from "@/components/jobposting/jobList";
import LoadMoreJobs from "@/components/jobposting/loadMoreJobs";

export default function JobsPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl w-full space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
            Find Your Next Opportunity
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Discover jobs that match your skills and passions.
          </p>
        </header>

        <div className="flex justify-center">
          <SearchBarComponent />
        </div>

        <main>
          <JobList />
        </main>

        <footer className="flex justify-center">
          <LoadMoreJobs />
        </footer>
      </div>
    </div>
  );
}
