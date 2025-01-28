"use client";

import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetUserFollowingQuery } from "@/redux/api/userApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import FollowWrapper from "./followWrapper";
import useCurrentUser from "@/hooks/useCurrentUser";
import { truncateText } from "@/lib/utils";

interface FollowingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const FollowingModal: React.FC<FollowingModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const {
    data: followingData,
    isLoading,
    error,
  } = useGetUserFollowingQuery({
    id: userId,
    offset: 0,
    limit: 10,
  });

  const { currentUser } = useCurrentUser();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Following</DialogTitle>
        </DialogHeader>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading followings</p>}
        {followingData?.following && followingData.following.length === 0 ? (
          <div className="w-full flex justify-center items-center">
            <p className="text-sm text-gray-600">
              This user is not following anyone.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {followingData?.following.map((following: any) => (
              <li
                key={following.id}
                className="hover:bg-gray-100 transition duration-300 rounded p-2"
              >
                <div className="flex justify-between space-x-4 items-center">
                  <Link href={following.id} className="w-full">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src={following.profile_pic}
                          alt={following.name}
                        />
                        <AvatarFallback>
                          {following.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{following.name}</p>
                        <p className="text-sm text-gray-500">
                          {truncateText(following.headline, 40)}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <FollowWrapper
                    loggedUserId={currentUser?.id}
                    targetUserId={following.id}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FollowingModal;
