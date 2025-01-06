"use client";

import React from "react";
import { useEditJobPostingForm } from "@/hooks/useEditJobPostingForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditJobPostingProps {
  jobId: string;
}

const EditJobPosting: React.FC<EditJobPostingProps> = ({ jobId }) => {
  const {
    formData,
    techInput,
    errors,
    isLoading,
    handleInputChange,
    handleDateChange,
    setTechInput,
    addTech,
    removeTech,
    handleModeChange,
    handleSubmit,
  } = useEditJobPostingForm(jobId);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Job Posting</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter job title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Job Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Job Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter job description"
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Budget */}
          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700"
            >
              Budget
            </label>
            <Input
              id="budget"
              name="budget"
              type="number"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="Enter budget"
              className={errors.budget ? "border-red-500" : ""}
            />
            {errors.budget && (
              <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
            )}
          </div>

          {/* Deadline */}
          <div>
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700"
            >
              Deadline
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${
                    errors.deadline ? "border-red-500" : ""
                  }`}
                >
                  {formData.deadline ? (
                    format(new Date(formData.deadline), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    formData.deadline ? new Date(formData.deadline) : undefined
                  }
                  onSelect={handleDateChange}
                  disabled={(date) =>
                    date < new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.deadline && (
              <p className="mt-1 text-sm text-red-500">{errors.deadline}</p>
            )}
          </div>

          {/* Required Technologies */}
          <div>
            <label
              htmlFor="techRequired"
              className="block text-sm font-medium text-gray-700"
            >
              Required Technologies
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.techRequired.map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tech}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTech(tech)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="techInput"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTech())
                }
                placeholder="Add technology"
                className={errors.techRequired ? "border-red-500" : ""}
              />
              <Button type="button" onClick={addTech}>
                Add
              </Button>
            </div>
            {errors.techRequired && (
              <p className="mt-1 text-sm text-red-500">{errors.techRequired}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder='Example: "Texas, US"'
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">{errors.location}</p>
            )}
          </div>

          {/* Job Mode */}
          <div>
            <label
              htmlFor="mode"
              className="block text-sm font-medium text-gray-700"
            >
              Job Mode
            </label>
            <Select
              onValueChange={handleModeChange}
              defaultValue={formData.mode}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select job mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="REMOTE">Remote</SelectItem>
                <SelectItem value="HYBRID">Hybrid</SelectItem>
                <SelectItem value="ONSITE">Onsite</SelectItem>
              </SelectContent>
            </Select>
            {errors.mode && (
              <p className="mt-1 text-sm text-red-500">{errors.mode}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Enter job category"
              className={errors.category ? "border-red-500" : ""}
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Job Posting"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditJobPosting;
