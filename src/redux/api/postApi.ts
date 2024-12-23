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
      query: (body) => ({
        url: `/posts/update`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/delete`,
        method: "DELETE",
        body: postId,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
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
      query: (body) => ({
        url: `/posts/like`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),
    unlikePost: builder.mutation({
      query: (body) => ({
        url: `/posts/unlike`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetUserPostsQuery,
} = postApi;
