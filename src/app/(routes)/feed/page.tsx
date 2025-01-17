import Posts from "@/components/feed/posts";
import WritePostComponent from "@/components/feed/writePost";

export default function Feed() {
  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-50 mb-5">
      <div className="w-full max-w-[600px] space-y-4 pt-4 sm:pt-8 md:pt-12 lg:pt-16 px-2 sm:px-4 md:px-6 lg:px-8">
        <WritePostComponent />
        <Posts />
      </div>
    </div>
  );
}
