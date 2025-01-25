import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const datePosted = new Date(dateString);
  const now = new Date();

  const diff = now.getTime() - datePosted.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  let timeAgo = "";
  if (years > 0) {
    timeAgo = `${years}y`;
  } else if (months > 0) {
    timeAgo = `${months}m`;
  } else if (days > 0) {
    timeAgo = `${days}d`;
  } else if (hours > 0) {
    timeAgo = `${hours}h`;
  } else if (minutes > 0) {
    timeAgo = `${minutes}m`;
  } else {
    timeAgo = `${seconds}s`;
  }

  return `${timeAgo}`;
}

export function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function userLikedAPost(post: any | undefined, userId: string): boolean {
  if (!post || !post.likes || post.likes.length === 0) return false;

  return post.likes.some((like: any) => like.userId === userId);
}

import { JobPostingFormData } from "@/hooks/useJobPostingForm";

export function validateForm(formData: JobPostingFormData) {
  const errors: Record<string, string> = {};

  if (formData.title.length < 5)
    errors.title = "Title must be at least 5 characters long";
  if (formData.description.length < 20)
    errors.description = "Description must be at least 20 characters long";
  if (
    !formData.budget ||
    isNaN(Number(formData.budget)) ||
    Number(formData.budget) <= 0
  )
    errors.budget = "Budget must be a positive number";
  if (formData.deadline < new Date())
    errors.deadline = "Deadline must be in the future";
  if (formData.techRequired.length === 0)
    errors.techRequired = "At least one technology is required";
  if (formData.category.length === 0) errors.category = "Category is required";
  if (formData.location.length === 0) errors.location = "Location is required";
  if (!["REMOTE", "HYBRID", "ONSITE"].includes(formData.mode))
    errors.mode = "Invalid job mode";
  if (!formData.experienceLevel.length)
    errors.experienceLevel = "Experience level is required";

  return errors;
}

export function hasApplied(userId: string, jobPosting: any): boolean {
  const { applicants } = jobPosting;

  return (
    applicants?.some((applicant: any) => applicant.userId === userId) ?? false
  );
}
