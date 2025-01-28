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

const WritePostComponent = ({
  onPostCreated,
}: {
  onPostCreated: () => void;
}) => {
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
      onPostCreated(); // Notifica que un nuevo post ha sido creado
      console.log("Post created successfully!");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <>
      <Card className="bg-white mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div className="p-3 sm:p-4 flex flex-row gap-2 items-center">
              <img
                src={currentUser?.profile_pic || "/placeholder.svg"}
                alt="Profile picture"
                className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full object-cover"
              />
              <button className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-500 bg-gray-100 rounded-full focus:outline-none hover:bg-gray-200 transition-colors">
                Share your thoughts, ideas, or work...
              </button>
            </div>
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-[800px] sm:w-full">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl font-semibold">
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src={currentUser?.profile_pic || "/placeholder.svg"}
                    alt="Profile"
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-base sm:text-lg">
                      {currentUser?.name || "User Name"}
                    </p>
                    <p className="text-xs sm:text-sm font-normal text-gray-600">
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
              className="max-w-[600px] mt-3 sm:mt-4 resize-none bg-transparent border-none focus:outline-none text-base sm:text-lg placeholder:text-gray-500"
              rows={5}
            />
            <DialogFooter className="flex justify-end mt-3 sm:mt-4 border-t-2 pt-2">
              <Button
                variant="outline"
                onClick={handleCreatePost}
                disabled={isLoading}
                className="text-primary rounded-full bg-gray-100 border-gray-100 hover:bg-gray-200 hover:border-gray-200 text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2"
              >
                {isLoading ? "Posting..." : "Post"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <CardFooter className="flex justify-between border-t py-1 sm:py-2">
          <Button variant="ghost" className="text-xs sm:text-sm">
            <Image className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Photo
          </Button>
          <Button variant="ghost" className="text-xs sm:text-sm">
            Write Article
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default WritePostComponent;
