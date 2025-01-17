import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  return (
    <div className="flex items-center sm:items-center sm:space-y-0 space-x-2 sm:space-x-4 mb-6">
      <Select
        value={sortBy}
        onValueChange={(value) => onSortChange(value, sortOrder)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Order by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt">Created Date</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={sortOrder}
        onValueChange={(value) => onSortChange(sortBy, value)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Sort order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Newest</SelectItem>
          <SelectItem value="asc">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
