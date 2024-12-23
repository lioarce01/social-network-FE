import { Ellipsis } from "lucide-react";
import React from "react";
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

  const authorId = post.author?.id;
  return (
    <>
      {authorId === currentUser?.id && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32" align="end">
            <DropdownMenuItem>
              <EditPost postId={post.id} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeletePost postId={post.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default PostSettingsComponent;
