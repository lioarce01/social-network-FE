import React from "react";
import { Button } from "../ui/button";
import { useFollowUserMutation } from "@/redux/api/userApi";
import { Loader2, UserRoundCheck } from "lucide-react";

const FollowUser = ({
  userId,
  targetUserId,
}: {
  userId: string;
  targetUserId: string;
}) => {
  const [followUser, { isLoading }] = useFollowUserMutation();

  const handleFollow = async () => {
    try {
      await followUser({ userId, followingId: targetUserId }).unwrap();
      console.log("Usuario seguido con éxito");
    } catch (error) {
      console.error("Error al seguir al usuario:", error);
    }
  };

  return (
    <Button onClick={handleFollow} disabled={isLoading}>
      {isLoading ? <Loader2 className="animate-spin" /> : <UserRoundCheck />}
    </Button>
  );
};

export default FollowUser;
