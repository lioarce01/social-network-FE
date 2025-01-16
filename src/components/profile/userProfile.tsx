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
    <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-lg border border-gray-200">
      {/* Header */}
      <CardHeader className="bg-gray-50 p-6 text-center rounded-t-lg">
        <Avatar className="h-28 w-28 mx-auto mb-4">
          <AvatarImage src={profileUser.profile_pic} alt={profileUser.name} />
          <AvatarFallback>{profileUser.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-3xl font-semibold text-gray-800">
          {profileUser.name}
        </CardTitle>
        {profileUser.email && (
          <p className="text-sm text-gray-600 mt-1">{profileUser.email}</p>
        )}
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-6 p-6">
        {/* Headline */}
        {profileUser.headline && (
          <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-md text-center">
            <p className="text-lg font-medium">{profileUser.headline}</p>
          </div>
        )}

        {/* Current Position */}
        {profileUser.current_position ? (
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-gray-500">Currently:</span>
            <p className="text-sm font-medium text-gray-700">
              {profileUser.current_position}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center italic">
            This user has not provided a current position.
          </p>
        )}

        {/* Location */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-400">City</p>
            {profileUser.city ? (
              <p className="text-sm font-medium text-gray-700">
                {profileUser.city}
              </p>
            ) : (
              <p className="text-sm text-gray-500 italic">Not provided</p>
            )}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Country</p>
            {profileUser.country ? (
              <p className="text-sm font-medium text-gray-700">
                {profileUser.country}
              </p>
            ) : (
              <p className="text-sm text-gray-500 italic">Not provided</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
