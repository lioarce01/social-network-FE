import React, { useState } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { MessageSquare } from "lucide-react";
import LikeButton from "./likeButton";
import UnlikeButton from "./unlikeButton";
import { formatDate, userLikedAPost } from "@/lib/utils";
import { useGetPostByIdQuery } from "@/redux/api/postApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import PostDetail from "./postDetail";
import { DialogDescription } from "@radix-ui/react-dialog";

const CardFooterComponent = ({ post, currentUser }: any) => {
  const { data: queryPost, isLoading, error } = useGetPostByIdQuery(post?.id);
  const hasLiked = userLikedAPost(queryPost, currentUser?.id || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <CardFooter className="flex justify-between border-t py-2 sm:py-4">
        {hasLiked ? (
          <UnlikeButton post={post} currentUser={currentUser} />
        ) : (
          <LikeButton post={post} currentUser={currentUser} />
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleModal}
          className="text-xs sm:text-sm"
        >
          <MessageSquare className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Comment
        </Button>
      </CardFooter>

      <Dialog open={isModalOpen} onOpenChange={toggleModal}>
        <DialogContent className="w-[90vw] max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl space-y-4">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-start space-x-4">
                <img
                  src={
                    queryPost?.author?.profile_pic ||
                    "https://via.placeholder.com/40" ||
                    "/placeholder.svg"
                  }
                  alt="Author Avatar"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"
                />
                <div className="flex flex-col space-y-1">
                  <p className="font-medium text-sm sm:text-base">
                    {queryPost?.author?.name || "Unknown Author"}
                  </p>
                  <p className="text-xs sm:text-sm font-normal text-gray-600">
                    {queryPost?.author?.current_position ||
                      queryPost?.author?.headline}
                  </p>
                  <p className="text-xs sm:text-sm font-light text-gray-500">
                    {formatDate(queryPost?.createdAt)}
                  </p>
                </div>
              </div>
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <PostDetail queryPost={queryPost} currentUser={currentUser} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardFooterComponent;
