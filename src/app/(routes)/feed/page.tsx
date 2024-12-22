"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ThumbsUp, MessageSquare, Share2, Image } from "lucide-react";
import { useGetPostsQuery } from "@/redux/api/postApi";
import AuthSyncWrapper from "@/components/auth/AuthSyncWrapper";
import { formatDate } from "@/lib/utils";

export default function Feed() {
  const { data: posts, isLoading } = useGetPostsQuery({});

  console.log("comments", posts);

  return (
    <AuthSyncWrapper>
      <div className="w-full min-h-screen flex justify-center bg-gray-100">
        <div className="space-y-8 min-w-[80%] md:min-w-[50%] pt-16">
          <Card className="bg-white">
            <CardHeader>
              <Input
                placeholder="Share your thoughts, ideas, or work..."
                className="bg-gray-50"
              />
            </CardHeader>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="ghost">
                <Image className="mr-2 h-4 w-4" />
                Photo
              </Button>

              <Button variant="ghost">Write Article</Button>
            </CardFooter>
          </Card>

          {posts?.map((post: any) => (
            <Card key={post.id} className="bg-white">
              <CardHeader className="flex flex-row items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={post.author?.profile_pic}
                    alt={post.author?.name}
                  />
                </Avatar>
                <div>
                  <h3 className="font-bold">{post.author?.name}</h3>
                  <p className="text-sm text-gray-500">
                    Senior Software Engineer at TechCorp
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(post.updatedAt)}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{post.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="mr-2 h-4 w-4" /> {post.likeCount} Likes
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />{" "}
                  {post.comments?.length} Comments
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AuthSyncWrapper>
  );
}
