import React from "react";
import { Button } from "../ui/button";
import { useUnfollowUserMutation } from "@/redux/api/userApi";
import { Loader2, UserRoundMinus } from "lucide-react";

const UnfollowUser = ({
  userId,
  targetUserId,
}: {
  userId: string;
  targetUserId: string;
}) => {
  const [unfollowUser, { isLoading }] = useUnfollowUserMutation();

  const handleUnfollow = async () => {
    try {
      await unfollowUser({ userId, followingId: targetUserId }).unwrap();
      console.log("Usuario dejado de seguir con éxito");
    } catch (error) {
      console.error("Error al dejar de seguir al usuario:", error);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleUnfollow}
      disabled={isLoading}
      className="border"
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <UserRoundMinus />}
    </Button>
  );
};

export default UnfollowUser;
