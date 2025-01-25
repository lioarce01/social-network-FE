import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownUp } from "lucide-react";

interface PostFiltersProps {
  sortBy: string;
  sortOrder: string;
  onSortChange: (sortBy: string, sortOrder: string) => void;
}

export const PostFilters: React.FC<PostFiltersProps> = ({
  sortBy,
  sortOrder,
  onSortChange,
}) => {
  const getSortLabel = () => {
    if (sortBy === "createdAt" && sortOrder === "desc") return "Recent";
    if (sortBy === "createdAt" && sortOrder === "asc") return "Oldest";
    return "Sort by";
  };

  return (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 focus:outline-none">
            <ArrowDownUp className="h-4 w-4" /> {/* Ícono */}
            <span>{getSortLabel()}</span> {/* Texto */}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem
            onClick={() => onSortChange("createdAt", "desc")}
            className="cursor-pointer"
          >
            Recent
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onSortChange("createdAt", "asc")}
            className="cursor-pointer"
          >
            Oldest
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
