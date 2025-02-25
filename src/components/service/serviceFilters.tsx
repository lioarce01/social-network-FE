"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

interface ServiceProps {
  sortBy: string[];
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string[], sortOrder: "asc" | "desc") => void;
}

const ServiceFilters: React.FC<ServiceProps> = ({
  sortBy,
  sortOrder,
  onSortChange,
}) => {
  const handleSortByChange = (value: string) => {
    onSortChange([value], sortOrder);
  };

  const handleSortOrderChange = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    onSortChange(sortBy, newSortOrder);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sort Services</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="sortBy" className="text-sm font-medium">
            Sort By
          </Label>
          <Select value={sortBy[0] || ""} onValueChange={handleSortByChange}>
            <SelectTrigger id="sortBy" className="w-full">
              <SelectValue placeholder="Select a sorting option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date Created</SelectItem>
              <SelectItem value="price">Price</SelectItem>
            </SelectContent>
          </Select>
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

export default ServiceFilters;
