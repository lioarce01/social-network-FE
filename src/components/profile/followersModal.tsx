"use client";

import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
} from "@/redux/api/userApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import FollowWrapper from "./followWrapper";
import useCurrentUser from "@/hooks/useCurrentUser";
import { truncateText } from "@/lib/utils";

interface FollowersModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const FollowersModal: React.FC<FollowersModalProps> = ({
  isOpen,
  onClose,
  userId: profileUserId,
}) => {
  const {
    data: followersData,
    isLoading,
    error,
  } = useGetUserFollowersQuery({
    id: profileUserId,
    offset: 0,
    limit: 10,
  });

  const { currentUser } = useCurrentUser();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Followers</DialogTitle>
        </DialogHeader>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading followers</p>}
        {followersData?.followers.length > 0 ? (
          <ul className="space-y-4">
            {followersData.followers.map((follower: any) => (
              <li
                key={follower.id}
                className="hover:bg-gray-100 transition duration-300 rounded p-2 min-h-[50px]"
              >
                <div className="flex justify-between space-x-4 items-center">
                  <Link href={follower.id} className="w-full">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src={follower.profile_pic}
                          alt={follower.name}
                        />
                        <AvatarFallback>{follower.name}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{follower.name}</p>
                        <p className="text-sm text-gray-500">
                          {truncateText(follower.headline, 40)}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <FollowWrapper
                    loggedUserId={currentUser.id}
                    targetUserId={follower.id}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-full flex justify-center items-center">
            <p className="text-sm text-gray-600">This user has no followers.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FollowersModal;
