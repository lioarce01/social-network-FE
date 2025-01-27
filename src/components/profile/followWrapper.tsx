import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/redux/api/userApi";
import useGetUserFollowings from "@/hooks/useGetUserFollowings";
import { Loader2, UserRoundCheck, UserRoundMinus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface FollowWrapperProps {
  loggedUserId: string;
  targetUserId: string;
}

const FollowWrapper = ({ loggedUserId, targetUserId }: FollowWrapperProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { followings, isLoading, isError } = useGetUserFollowings();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const [actionLoading, setActionLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState<"follow" | "unfollow">(
    "follow",
  );

  const memoizedFollowings = useMemo(() => followings, [followings]);

  const isFollowing = memoizedFollowings?.some(
    (id: string) => id === targetUserId,
  );

  const handleAction = async () => {
    setActionLoading(true);
    try {
      if (currentAction === "follow") {
        await followUser({
          userId: loggedUserId,
          followingId: targetUserId,
        }).unwrap();
      } else {
        await unfollowUser({
          userId: loggedUserId,
          followingId: targetUserId,
        }).unwrap();
      }
    } catch (error) {
      console.error("Error performing action:", error);
    } finally {
      setActionLoading(false);
      setShowConfirmation(false);
    }
  };

  if (isLoading) return <Loader2 className="animate-spin h-5 w-5" />;
  if (isError) return <div>Error loading data</div>;
  if (loggedUserId === targetUserId) return null;

  return (
    <>
      <Button
        variant={isFollowing ? "secondary" : "default"}
        onClick={() => {
          setCurrentAction(isFollowing ? "unfollow" : "follow");
          setShowConfirmation(true);
        }}
        disabled={actionLoading}
      >
        {actionLoading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : isFollowing ? (
          <UserRoundMinus className="h-5 w-5" />
        ) : (
          <UserRoundCheck className="h-5 w-5" />
        )}
      </Button>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentAction === "follow" ? "Follow User?" : "Unfollow User?"}
            </DialogTitle>
          </DialogHeader>

          <p className="text-gray-600">
            {currentAction === "follow"
              ? "Are you sure you want to follow this user?"
              : "Are you sure you want to unfollow this user?"}
          </p>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            <Button
              variant={currentAction === "follow" ? "default" : "destructive"}
              onClick={handleAction}
              disabled={actionLoading}
            >
              {actionLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : currentAction === "follow" ? (
                "Follow"
              ) : (
                "Unfollow"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FollowWrapper;
