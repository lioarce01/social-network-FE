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

const UserProfile = ({
  profileUser,
  isLoading,
}: {
  profileUser: any;
  isLoading: boolean;
}) => {
  const getValueOrPlaceholder = (
    value: string | undefined | null,
    placeholder = "Not provided",
  ) => {
    return value ?? placeholder;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{profileUser.name}'s Profile</CardTitle>
        <CardDescription>View user profile information.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profileUser.profile_pic} alt={profileUser.name} />
            <AvatarFallback>{profileUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-lg">{profileUser.name}</p>
            <p className="text-gray-500">{profileUser.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Headline:</p>
              <p>{getValueOrPlaceholder(profileUser.headline)}</p>
            </div>
            <div>
              <p className="font-semibold">Country:</p>
              <p>{getValueOrPlaceholder(profileUser.country)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Postal Code:</p>
              <p>{getValueOrPlaceholder(profileUser.postal_code)}</p>
            </div>
            <div>
              <p className="font-semibold">City:</p>
              <p>{getValueOrPlaceholder(profileUser.city)}</p>
            </div>
          </div>

          <div>
            <p className="font-semibold">Current Position:</p>
            <p>{getValueOrPlaceholder(profileUser.current_position)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Role:</p>
              <p>{profileUser.role}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p>{profileUser.enabled ? "Enabled" : "Disabled"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Created At:</p>
              <p>{new Date(profileUser.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold">Updated At:</p>
              <p>{new Date(profileUser.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
