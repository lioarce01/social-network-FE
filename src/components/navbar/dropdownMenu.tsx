"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import LogoutButton from "../auth/LogoutButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Loader2 } from "lucide-react";

const DropdownMenuComponent = () => {
  const { currentUser, isLoading } = useCurrentUser();
  if (isLoading)
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex flex-col h-8 w-8 rounded-full"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={currentUser?.profile_pic}
                alt={currentUser?.name}
              />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>{currentUser?.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link className="w-full" href={`/profile/${currentUser?.id}`}>
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropdownMenuComponent;
