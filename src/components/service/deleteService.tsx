import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useDeleteServiceMutation } from '@/redux/api/serviceApi';

interface DeleteServiceProps {
    serviceId: string
}

const DeleteService = ({serviceId}: DeleteServiceProps) => {
    const [deleteService, {isLoading: isDeleting}] = useDeleteServiceMutation()
    const router = useRouter()

    const handleDeleteService = async () => {
        try {
            await deleteService(serviceId).unwrap();
            router.push("/services");
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-left">Delete</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this service? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDeleteService}
            disabled={isDeleting}
          >
            {isDeleting ? <Loader2 className="animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteService