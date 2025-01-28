"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

interface ProfileFormProps {
  formData: {
    name: string;
    email: string;
    profile_pic: string;
    headline: string;
    country: string;
    postal_code: string;
    city: string;
    current_position: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isUpdating: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  isUpdating,
}) => {
  return (
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
          placeholder="Enter your name"
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
          placeholder="Enter your email"
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
          placeholder="Enter your headline"
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
          placeholder="Enter your current position"
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
          placeholder="Enter your country"
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
          placeholder="Enter your city"
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
          placeholder="Enter your postal code"
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
  );
};

export default ProfileForm;
