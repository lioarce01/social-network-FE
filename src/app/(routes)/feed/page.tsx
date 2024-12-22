import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Image } from "lucide-react";
import AuthSyncWrapper from "@/components/auth/AuthSyncWrapper";
import Posts from "@/components/feed/posts";

export default function Feed() {
  return (
    <AuthSyncWrapper>
      <div className="w-full min-h-screen flex justify-center bg-gray-50">
        <div className="space-y-2 min-w-[90%] md:min-w-[70%] lg:min-w-[50%] xl:min-w-[40%] pt-16">
          <Card className="bg-white mb-10">
            <CardHeader>
              <Input
                placeholder="Share your thoughts, ideas, or work..."
                className="bg-white"
              />
            </CardHeader>
            <CardFooter className="flex justify-between border-t pt-4 pb-10">
              <Button variant="ghost">
                <Image className="mr-2 h-4 w-4" />
                Photo
              </Button>

              <Button variant="ghost">Write Article</Button>
            </CardFooter>
          </Card>
          <Posts />
        </div>
      </div>
    </AuthSyncWrapper>
  );
}
