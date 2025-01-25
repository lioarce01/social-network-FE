import { User } from "./User";

export interface Post {
  id: string;
  content: string;
  authorId: string;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  author: User;
}
