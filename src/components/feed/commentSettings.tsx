import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import DeleteComment from "./deleteComment";

interface CommentSettingsProps {
  commentId: string;
}

const CommentSettings: React.FC<CommentSettingsProps> = ({ commentId }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
          <Ellipsis className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="z-[50] w-32 bg-white shadow-md border border-gray-200 rounded-md"
          sideOffset={4}
          align="end"
        >
          <DropdownMenuItem className="cursor-pointer p-2 text-sm hover:bg-gray-100">
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer p-2 text-sm text-red-600 hover:bg-red-50"
            onSelect={(e) => e.preventDefault()}
          >
            <DeleteComment commentId={commentId} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CommentSettings;
