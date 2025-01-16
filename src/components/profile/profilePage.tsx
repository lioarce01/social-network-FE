"use client";

import React from "react";
import { useGetUserBySubQuery } from "@/redux/api/userApi";
import useCurrentUser from "@/hooks/useCurrentUser";
import OwnProfile from "./ownProfile";
import UserProfile from "./userProfile";
import ProfileSkeleton from "./profileSkeleton";
import { Card, CardContent } from "@/components/ui/card";

const ProfilePage = ({ userId }: { userId: string }) => {
  const { currentUser, isLoading: currentUserLoading } = useCurrentUser();
  const {
    data: profileUser,
    isLoading: profileLoading,
    error,
  } = useGetUserBySubQuery(userId);

  // Show the skeleton while loading
  if (profileLoading || currentUserLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !profileUser) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent>
          <p className="text-center text-red-500">
            {error ? "Error loading user profile." : "User not found."}
          </p>
        </CardContent>
      </Card>
    );
  }

  const isOwnProfile = currentUser?.id === userId;

  return isOwnProfile ? (
    <OwnProfile
      userId={userId}
      profileUser={profileUser}
      isLoading={currentUserLoading}
    />
  ) : (
    <UserProfile profileUser={profileUser} isLoading={profileLoading} />
  );
};

export default ProfilePage;
