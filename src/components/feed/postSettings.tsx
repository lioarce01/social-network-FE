import { Ellipsis } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import useCurrentUser from "@/hooks/useCurrentUser";
import EditPost from "./editPost";
import DeletePost from "./deletePost";

const PostSettingsComponent = ({ post }: any) => {
  const { currentUser } = useCurrentUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleMenuOpen = () => setIsMenuOpen(true);

  const authorId = post.author?.id;

  return (
    <>
      {authorId === currentUser?.id && (
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full"
              onClick={handleMenuOpen}
            >
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32" align="end">
            <DropdownMenuItem
              onClick={() => setIsEditOpen(true)}
              className="cursor-pointer"
            >
              Edit Post
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeletePost postId={post.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {isEditOpen && (
        <EditPost
          postId={post.id}
          initialContent={post.content}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};

export default PostSettingsComponent;
