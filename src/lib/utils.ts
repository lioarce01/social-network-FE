import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { JobPostingFormData } from "@/hooks/useJobPostingForm";
import { formatDistance, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const datePosted = parseISO(dateString);
  const now = new Date();

  if (datePosted > now) {
    return "just now";
  }

  const timeAgo = formatDistance(datePosted, now, { addSuffix: true });

  return timeAgo;
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
  if (!formData.experience_level.length)
    errors.experienceLevel = "Experience level is required";

  return errors;
}

export function hasApplied(userId: string, jobPosting: any): boolean {
  const { applicants } = jobPosting;

  return (
    applicants?.some((applicant: any) => applicant.userId === userId) ?? false
  );
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
