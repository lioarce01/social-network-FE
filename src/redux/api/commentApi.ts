import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getPostComments: builder.query({
      query: ({ postId, ...params }) => ({
        url: `/comments/post/${postId}`,
        params: {
          sortBy: params.sortBy || "createdAt",
          sortOrder: params.sortOrder || "desc",
          offset: params.offset || 0,
          limit: params.limit || 10,
        },
      }),
      providesTags: (result) =>
        result.comments
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
  useGetAllCommentsQuery,
  useGetUserCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
