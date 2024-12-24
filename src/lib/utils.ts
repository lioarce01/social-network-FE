import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const datePosted = new Date(dateString);
  const now = new Date();

  const diff = now.getTime() - datePosted.getTime();

  // Time constants
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

export function userLikedAPost(post: any | undefined, userId: string): boolean {
  if (!post || !post.likes || post.likes.length === 0) return false;

  return post.likes.some((like: any) => like.userId === userId);
}
