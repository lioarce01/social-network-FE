"use client";

import React, { useState } from "react";
import { Card, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Image } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useCreatePostMutation } from "@/redux/api/postApi";
import useCurrentUser from "@/hooks/useCurrentUser";

const WritePostComponent = () => {
  const { currentUser } = useCurrentUser();
  const [content, setContent] = useState("");
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleCreatePost = async () => {
    if (!content.trim()) return;
    try {
      await createPost({ content, userId: currentUser?.id }).unwrap();
      setContent("");
      setIsOpen(false);
      console.log("Post created successfully!");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <>
      <Card className="bg-white mb-10">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div className="p-4 flex flex-row gap-2">
              <img
                src={currentUser?.profile_pic}
                alt="Profile picture"
                className="h-12 w-12 rounded-full object-cover"
              />
              <button className="w-full text-left px-4 py-3 text-gray-500 bg-gray-100 rounded-full focus:outline-none">
                Share your thoughts, ideas, or work...
              </button>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-[800px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                <div className="flex items-center gap-3">
                  <img
                    src={currentUser?.profile_pic}
                    alt="Profile"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">
                      {currentUser?.name || "User Name"}
                    </p>
                    <p className="text-sm font-normal text-gray-600">
                      {currentUser?.current_position || currentUser?.headline}
                    </p>
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <textarea
              placeholder="What do you want to talk about?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mt-4 resize-none bg-transparent border-none focus:outline-none text-lg placeholder:text-gray-500"
              rows={5}
            />
            <DialogFooter className="flex justify-end mt-4 border-t-2 pt-2">
              <Button
                variant="outline"
                onClick={handleCreatePost}
                disabled={isLoading}
                className="text-primary rounded-full bg-gray-100 border-gray-100 hover:bg-gray-200 hover:border-gray-200"
              >
                {isLoading ? "Posting..." : "Post"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <CardFooter className="flex justify-between border-t py-2">
          <Button variant="ghost">
            <Image className="mr-2 h-4 w-4" />
            Photo
          </Button>
          <Button variant="ghost">Write Article</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default WritePostComponent;
