import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const PostSkeleton = () => {
  return (
    <Card className="bg-white w-full sm:max-w-[600px] mx-auto">
      <CardHeader className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
        <div className="flex flex-row items-center space-x-4">
          <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
          <div className="space-y-1 sm:space-y-2">
            <Skeleton className="h-3 sm:h-4 w-[120px] sm:w-[150px]" />
            <Skeleton className="h-2 sm:h-3 w-[80px] sm:w-[100px]" />
            <Skeleton className="h-2 sm:h-3 w-[60px] sm:w-[80px]" />
          </div>
        </div>
        <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 rounded-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-3 sm:h-4 w-full mb-2" />
        <Skeleton className="h-3 sm:h-4 w-full mb-2" />
        <Skeleton className="h-3 sm:h-4 w-2/3" />
      </CardContent>
      <CardFooter className="flex justify-between border-t py-2 sm:py-4">
        <Skeleton className="h-6 w-16 sm:h-8 sm:w-20" />
        <Skeleton className="h-6 w-16 sm:h-8 sm:w-20" />
      </CardFooter>
    </Card>
  );
};

export default PostSkeleton;
