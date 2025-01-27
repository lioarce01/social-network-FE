"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useUpdateUserMutation } from "@/redux/api/userApi";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import DeleteAccount from "./deleteAccount";
import ProfileForm from "./profileForm";
import FollowersModal from "./followersModal";
import FollowingModal from "./followingModal";
import { Button } from "@/components/ui/button";

const OwnProfile = ({
  userId,
  profileUser,
  isLoading,
}: {
  userId: string;
  profileUser: any;
  isLoading: boolean;
}) => {
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profile_pic: "",
    headline: "",
    country: "",
    postal_code: "",
    city: "",
    current_position: "",
  });
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  useEffect(() => {
    if (profileUser) {
      setFormData({
        name: profileUser.name || "",
        email: profileUser.email || "",
        profile_pic: profileUser.profile_pic || "",
        headline: profileUser.headline || "",
        country: profileUser.country || "",
        postal_code: profileUser.postal_code || "",
        city: profileUser.city || "",
        current_position: profileUser.current_position || "",
      });
    }
  }, [profileUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateData = {
        name: formData.name,
        profile_pic: formData.profile_pic,
        headline: formData.headline,
        country: formData.country,
        postal_code: formData.postal_code,
        city: formData.city,
        current_position: formData.current_position,
      };
      await updateUser({ id: userId, data: updateData }).unwrap();
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description:
          "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>
          Manage your account settings and set email preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setIsFollowersModalOpen(true)}
          >
            {profileUser.followersCount} Followers
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsFollowingModalOpen(true)}
          >
            {profileUser.followingCount} Following
          </Button>
        </div>
        <ProfileForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isUpdating={isUpdating}
        />
      </CardContent>
      <CardFooter>
        <DeleteAccount userId={userId} />
      </CardFooter>

      <FollowersModal
        isOpen={isFollowersModalOpen}
        onClose={() => setIsFollowersModalOpen(false)}
        userId={userId}
      />
      <FollowingModal
        isOpen={isFollowingModalOpen}
        onClose={() => setIsFollowingModalOpen(false)}
        userId={userId}
      />
    </Card>
  );
};

export default OwnProfile;
