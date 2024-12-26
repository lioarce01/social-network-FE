"use client";
import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import Link from "next/link";

const SearchBarComponent = () => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
      <Input
        placeholder="Job title, keywords, or company"
        className="flex-grow"
      />
      <Select>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="remote">Remote</SelectItem>
          <SelectItem value="onsite">On-site</SelectItem>
          <SelectItem value="hybrid">Hybrid</SelectItem>
        </SelectContent>
      </Select>
      <Link href="/createJobPosting">
        <Button>Create Job Posting</Button>
      </Link>
      <Button className="w-full md:w-auto">Search</Button>
    </div>
  );
};

export default SearchBarComponent;
