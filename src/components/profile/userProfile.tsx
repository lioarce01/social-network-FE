"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfile = ({
  profileUser,
  isLoading,
}: {
  profileUser: any;
  isLoading: boolean;
}) => {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md rounded-lg">
      <CardHeader className="text-center">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarImage src={profileUser.profile_pic} alt={profileUser.name} />
          <AvatarFallback>{profileUser.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl font-bold text-gray-800">
          {profileUser.name}
        </CardTitle>
        {profileUser.email ? (
          <p className="text-sm text-gray-500">{profileUser.email}</p>
        ) : (
          <p className="text-sm text-gray-500 italic">Email not provided</p>
        )}
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="text-center">
          {profileUser.headline ? (
            <p className="text-lg font-medium text-gray-700">
              {profileUser.headline}
            </p>
          ) : (
            <p className="text-sm text-gray-500 italic">
              This user has not shared a headline.
            </p>
          )}
        </div>

        <div className="text-center">
          {profileUser.current_position ? (
            <p className="text-sm text-gray-500">
              {profileUser.current_position}
            </p>
          ) : (
            <p className="text-sm text-gray-500 italic">
              This user has not provided a current position.
            </p>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          {profileUser.city ? (
            <p className="text-sm text-gray-600">{profileUser.city}</p>
          ) : (
            <p className="text-sm text-gray-500 italic">City not provided</p>
          )}
          {profileUser.country ? (
            <p className="text-sm text-gray-600">{profileUser.country}</p>
          ) : (
            <p className="text-sm text-gray-500 italic">Country not provided</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
