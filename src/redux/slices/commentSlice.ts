import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { User } from "./postSlice";

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
      state.comments = action.payload || [];
    },
    addComments: (state, action: PayloadAction<Comment[]>) => {
      const newComments = action.payload.filter(
        (newComment) =>
          !state.comments.some(
            (existingComment) => existingComment.id === newComment.id,
          ),
      );
      state.comments = [...state.comments, ...newComments];
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload || 0;
    },
  },
});

export const { setComments, addComments, setTotalCount } =
  commentsSlice.actions;
export default commentsSlice.reducer;
