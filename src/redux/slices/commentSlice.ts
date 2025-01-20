import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { User } from "./postSlice";

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
}

interface CommentsState {
  comments: Comment[];
  totalCount: number;
}

const initialState: CommentsState = {
  comments: [],
  totalCount: 0,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    addComments: (state, action: PayloadAction<Comment[]>) => {
      const newComments = action.payload.filter(
        (newComment) =>
          !state.comments.find((comment) => comment.id === newComment.id),
      );
      state.comments = [...state.comments, ...newComments];
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
  },
});

export const { setComments, addComments, setTotalCount } =
  commentsSlice.actions;

export const selectAllComments = (state: RootState) => state.comments.comments;
export const selectTotalCommentsCount = (state: RootState) =>
  state.comments.totalCount;

export default commentsSlice.reducer;
