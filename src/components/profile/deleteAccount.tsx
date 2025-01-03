"use client";

import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useDeleteUserMutation } from "@/redux/api/userApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useAuth0 } from "@auth0/auth0-react";

const DeleteAccount = ({ userId }: any) => {
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const { logout } = useAuth0();

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(userId).unwrap();
      console.log("deleting account with user id:", userId);

      await logout({
        logoutParams: { returnTo: window.location.origin },
      });
    } catch (error) {
      console.log("Error deleting user");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="text-left">
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDeleteAccount}
          >
            {isDeleting ? <Loader2 className="animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccount;
