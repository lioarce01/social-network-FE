import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({ type: "Post", id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    updatePost: builder.mutation({
      query: ({ id, body }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    getUserPosts: builder.query({
      query: (id) => `/posts/user/${id}`,
      providesTags: (result, error, id) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({ type: "Post", id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    likePost: builder.mutation({
      query: ({ userId, postId }) => ({
        url: `/posts/like`,
        method: "PUT",
        body: JSON.stringify({ userId, postId }),
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    unlikePost: builder.mutation({
      query: ({ userId, postId }) => ({
        url: `/posts/unlike`,
        method: "PUT",
        body: JSON.stringify({ userId, postId }),
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
