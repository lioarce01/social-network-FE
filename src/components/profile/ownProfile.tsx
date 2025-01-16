"use client";

import React, { useState, useEffect } from "react";
import { useUpdateUserMutation } from "@/redux/api/userApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DeleteAccount from "./deleteAccount";

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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={formData.profile_pic} alt={formData.name} />
              <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Label htmlFor="profile_pic">Profile Picture URL</Label>
              <Input
                id="profile_pic"
                name="profile_pic"
                value={formData.profile_pic}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              readOnly
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              name="headline"
              value={formData.headline}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="current_position">Current Position</Label>
            <Input
              id="current_position"
              name="current_position"
              value={formData.current_position}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="postal_code">Postal Code</Label>
            <Input
              id="postal_code"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Profile"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <DeleteAccount userId={userId} />
      </CardFooter>
    </Card>
  );
};

export default OwnProfile;
