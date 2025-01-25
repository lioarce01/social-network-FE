import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Post } from "@/types/Post";

interface PostsState {
  posts: Post[];
  totalCount: number;
  postId: string | null;
  loading: boolean;
  noMorePosts: boolean;
}

const initialState: PostsState = {
  posts: [],
  totalCount: 0,
  postId: null,
  loading: false,
  noMorePosts: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.noMorePosts = action.payload.length < state.totalCount;
    },
    addPosts: (state, action: PayloadAction<Post[]>) => {
      const existingPostIds = new Set(state.posts.map((post) => post.id));
      const newPosts = action.payload.filter(
        (newPost) => !existingPostIds.has(newPost.id),
      );
      state.posts = [...state.posts, ...newPosts];
      state.noMorePosts = state.posts.length >= state.totalCount;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
      state.noMorePosts = state.posts.length >= action.payload;
    },
    setPostId: (state, action: PayloadAction<string>) => {
      state.postId = action.payload;
    },
    resetPostState: (state) => {
      state.postId = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setNoMorePosts: (state, action: PayloadAction<boolean>) => {
      state.noMorePosts = action.payload;
    },
  },
});

export const {
  setPosts,
  addPosts,
  setTotalCount,
  setPostId,
  resetPostState,
  setLoading,
  setNoMorePosts,
} = postsSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const selectTotalJobsCount = (state: RootState) =>
  state.posts.totalCount;
export const selectPostId = (state: RootState) => state.posts.postId;
export const selectLoading = (state: RootState) => state.posts.loading;
export const selectNoMorePosts = (state: RootState) => state.posts.noMorePosts;

export default postsSlice.reducer;
