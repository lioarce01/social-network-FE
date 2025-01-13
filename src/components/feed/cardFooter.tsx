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

const CardFooterComponent = ({ post, currentUser }: any) => {
  const { data: queryPost, isLoading, error } = useGetPostByIdQuery(post?.id);
  const hasLiked = userLikedAPost(queryPost, currentUser?.id || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <CardFooter className="flex justify-between border-t py-4">
        {hasLiked ? (
          <UnlikeButton post={post} currentUser={currentUser} />
        ) : (
          <LikeButton post={post} currentUser={currentUser} />
        )}
        <Button variant="ghost" size="sm" onClick={toggleModal}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Comment
        </Button>
      </CardFooter>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={toggleModal}>
        <DialogContent className="max-w-lg space-y-4">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-start space-x-4">
                <img
                  src={
                    queryPost?.author?.profile_pic ||
                    "https://via.placeholder.com/40"
                  }
                  alt="Author Avatar"
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex flex-col space-y-2">
                  <p className="font-medium">
                    {queryPost?.author?.name || "Unknown Author"}
                  </p>
                  <p className="text-sm font-light text-gray-500">
                    {formatDate(queryPost?.createdAt)}
                  </p>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <PostDetail queryPost={queryPost} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardFooterComponent;
