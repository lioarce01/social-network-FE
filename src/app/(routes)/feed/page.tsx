import Posts from "@/components/feed/posts";
import WritePostComponent from "@/components/feed/writePost";

export default function Feed() {
  return (
    <>
      <div className="w-full min-h-screen flex justify-center bg-gray-50">
        <div className="space-y-2  md:min-w-[70%] lg:min-w-[50%] xl:min-w-[40%] pt-16 px-2">
          <WritePostComponent />
          <Posts />
        </div>
      </div>
    </>
  );
}
