import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import DeleteService from './deleteService';

interface ServiceCardDropdownProps {
    serviceDetails: any
    serviceId: string
}

const ServiceCardDropdown = ({serviceDetails, serviceId}: ServiceCardDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          {/* EDIT JOB POSTING */}
          <Link className="w-full" href={`${serviceId}/update`}>
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {/* SWITCH STATUS SERVICE */}
          {/* <SwitchJobPostingStatus jobId={serviceId} jobDetails={serviceDetails} /> */}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-red-600"
        >
          {/* DELETE SERVICE POSTING */}
          <DeleteService serviceId={serviceId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServiceCardDropdown