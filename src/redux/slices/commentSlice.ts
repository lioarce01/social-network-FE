import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "@/types/Comment";

export interface CommentsState {
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
