"use client";

import React from "react";
import { MoreHorizontal, Edit, Trash, Eye, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CardHeaderDropdownProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onChangeStatus?: (status: "OPEN" | "CLOSED") => void;
}

const CardHeaderDropdown: React.FC<CardHeaderDropdownProps> = ({
  onEdit,
  onDelete,
  onChangeStatus,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChangeStatus?.("OPEN")}>
          <Eye className="mr-2 h-4 w-4" />
          <span>Mark as Open</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChangeStatus?.("CLOSED")}>
          <XCircle className="mr-2 h-4 w-4" />
          <span>Mark as Closed</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete} className="text-red-600">
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardHeaderDropdown;
