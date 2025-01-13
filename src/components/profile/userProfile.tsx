"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfile = ({ profileUser }: { profileUser: any }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{profileUser.name}'s Profile</CardTitle>
        <CardDescription>View user profile information.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profileUser.profile_pic} alt={profileUser.name} />
            <AvatarFallback>{profileUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{profileUser.name}</p>
            <p className="text-gray-500">{profileUser.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
