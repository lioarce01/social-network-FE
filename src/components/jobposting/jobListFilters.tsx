"use client";

import type React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface JobFiltersProps {
  sortBy: string[];
  sortOrder: string;
  onSortChange: (sortBy: string[], sortOrder: string) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({
  sortBy,
  sortOrder,
  onSortChange,
}) => {
  const handleSortByChange = (value: string) => {
    const newSortBy = sortBy.includes(value)
      ? sortBy.filter((item) => item !== value)
      : [...sortBy, value];
    onSortChange(newSortBy, sortOrder);
  };

  const handleSortOrderChange = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    onSortChange(sortBy, newSortOrder);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sort Jobs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
        </div>
        <div className="flex items-center justify-between">
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
          <span className="text-sm text-muted-foreground">
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobFilters;
