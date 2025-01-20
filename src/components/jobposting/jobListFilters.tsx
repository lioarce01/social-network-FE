"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface JobFiltersProps {
  sortBy: string[];
  sortOrder: string;
  onSortChange: (sortBy: string[], sortOrder: string) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({
  sortBy: initialSortBy,
  sortOrder: initialSortOrder,
  onSortChange,
}) => {
  const [sortBy, setSortBy] = useState<string[]>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<string>(initialSortOrder);

  useEffect(() => {
    setSortBy(initialSortBy);
    setSortOrder(initialSortOrder);
  }, [initialSortBy, initialSortOrder]);

  const handleSortByChange = (value: string) => {
    setSortBy((prev) => {
      const newSortBy = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      onSortChange(newSortBy, sortOrder);
      return newSortBy;
    });
  };

  const handleSortOrderChange = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    onSortChange(sortBy, newSortOrder);
  };

  return (
    <div className="bg-white p-4 my-4 rounded-lg shadow-lg w-auto">
      <h2 className="text-lg font-semibold mb-4">Sort Jobs</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="sortByCreatedAt"
            checked={sortBy.includes("createdAt")}
            onCheckedChange={() => handleSortByChange("createdAt")}
          />
          <Label
            htmlFor="sortByCreatedAt"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Date Created
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="sortByBudget"
            checked={sortBy.includes("budget")}
            onCheckedChange={() => handleSortByChange("budget")}
          />
          <Label
            htmlFor="sortByBudget"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Budget
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSortOrderChange}
            className="flex items-center space-x-1"
          >
            <span>Order</span>
            {sortOrder === "asc" ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
          </Button>
          <span className="text-sm text-gray-600">
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
