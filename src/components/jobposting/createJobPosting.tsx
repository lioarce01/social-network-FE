"use client";

import React, { useState } from "react";
import { useCreateJobMutation } from "@/redux/api/jobPostingApi";
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
import useCurrentUser from "@/hooks/useCurrentUser";

const CreateJobPosting = () => {
  const [createJob, { isLoading }] = useCreateJobMutation();
  const { currentUser } = useCurrentUser();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: new Date(),
    techRequired: [] as string[],
    category: "",
  });
  const [techInput, setTechInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, deadline: date }));
      setErrors((prev) => ({ ...prev, deadline: "" }));
    }
  };

  const addTech = () => {
    if (techInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        techRequired: [...prev.techRequired, techInput.trim()],
      }));
      setTechInput("");
      setErrors((prev) => ({ ...prev, techRequired: "" }));
    }
  };

  const removeTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      techRequired: prev.techRequired.filter((t) => t !== tech),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (formData.title.length < 5)
      newErrors.title = "Title must be at least 5 characters long";
    if (formData.description.length < 20)
      newErrors.description = "Description must be at least 20 characters long";
    if (
      !formData.budget ||
      isNaN(Number(formData.budget)) ||
      Number(formData.budget) <= 0
    )
      newErrors.budget = "Budget must be a positive number";
    if (formData.deadline < new Date())
      newErrors.deadline = "Deadline must be in the future";
    if (formData.techRequired.length === 0)
      newErrors.techRequired = "At least one technology is required";
    if (formData.category.length === 0)
      newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await createJob({
          userId: currentUser?.id,
          ...formData,
          budget: Number(formData.budget),
        }).unwrap();
        setFormData({
          title: "",
          description: "",
          budget: "",
          deadline: new Date(),
          techRequired: [],
          category: "",
        });
      } catch (error) {
        console.error("Failed to create job posting:", error);
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Job Posting</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                    format(formData.deadline, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.deadline}
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
            {isLoading ? "Creating..." : "Create Job Posting"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateJobPosting;
