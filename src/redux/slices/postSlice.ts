import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface User {
  id: string;
  sub: string;
  name: string;
  headline: string;
  country: string;
  postal_code: string;
  current_position: string;
  email: string;
  profile_pic: string;
  enabled: boolean;
  role: string;
}

export interface Post {
  id: string;
  content: string;
  authorId: string;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  author: User;
}

interface PostsState {
  posts: Post[];
  totalCount: number;
  postId: string | null;
}

const initialState: PostsState = {
  posts: [],
  totalCount: 0,
  postId: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPosts: (state, action: PayloadAction<Post[]>) => {
      const newPosts = action.payload.filter(
        (newPost) => !state.posts.find((post) => post.id === newPost.id),
      );
      state.posts = [...state.posts, ...newPosts];
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setPostId: (state, action: PayloadAction<string>) => {
      state.postId = action.payload;
    },
  },
});

export const { setPosts, addPosts, setTotalCount, setPostId } =
  postsSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const selectTotalJobsCount = (state: RootState) =>
  state.posts.totalCount;
export const selectPostId = (state: RootState) => state.posts.postId;

export default postsSlice.reducer;
