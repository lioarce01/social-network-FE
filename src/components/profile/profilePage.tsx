"use client";

import React, { useState, useEffect } from "react";
import {
  useGetUserBySubQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/redux/api/userApi";
import { useToast } from "@/hooks/use-toast";
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
import useCurrentUser from "@/hooks/useCurrentUser";

const ProfilePage = ({ userId }: { userId: string }) => {
  const { currentUser } = useCurrentUser();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profile_pic: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        profile_pic: currentUser.profile_pic || "",
      });
    }
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateData = { name: formData.name };
      await updateUser({ id: userId, data: updateData }).unwrap();
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      try {
        await deleteUser(currentUser.id).unwrap();
        toast({
          title: "Account Deleted",
          description: "Your account has been successfully deleted.",
        });
        // Redirect to home page or login page after deletion
      } catch (error) {
        toast({
          title: "Deletion Failed",
          description: "There was an error deleting your account.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
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
            <div>
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
        <Button
          variant="destructive"
          onClick={handleDeleteAccount}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            "Delete Account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfilePage;
