import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../lib/Auth0Config"


export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery,
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getPostComments: builder.query({
      query: ({ postId, sortBy, sortOrder, offset, limit }) => ({
        url: `/comments/post/${postId}`,
        params: {
          sortBy: "createdAt",
          sortOrder: "desc",
          offset,
          limit,
        },
      }),
      providesTags: (result) =>
        result && result.comments
          ? [
            ...result.comments.map(({ id }: { id: string }) => ({
              type: "Comment",
              id,
            })),
            { type: "Comment", id: "LIST" },
          ]
          : [{ type: "Comment", id: "LIST" }],
    }),
    getAllComments: builder.query({
      query: () => `/comments`,
    }),
    getUserComments: builder.query({
      query: (userId) => `/comments/user/${userId}`,
    }),
    createComment: builder.mutation({
      query: (comment) => ({
        url: `/comments`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: (result, error, id) => [{ type: "Comment", id: "LIST" }],
    }),
    updateComment: builder.mutation({
      query: (comment) => ({
        url: "/comments/update",
        method: "PUT",
        body: comment,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Comment", id }],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/delete`,
        method: "DELETE",
        body: commentId,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Comment", id }],
    }),
  }),
});

export const {
  useGetPostCommentsQuery,
  useLazyGetPostCommentsQuery,
  useGetAllCommentsQuery,
  useGetUserCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
