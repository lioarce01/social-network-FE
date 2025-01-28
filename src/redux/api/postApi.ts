import { Post } from "@/types/Post";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Post", "User", "UserLikedPosts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ offset, limit, sortBy, sortOrder }) => ({
        url: "/posts",
        params: { offset, limit, sortBy, sortOrder },
      }),
      providesTags: (result) =>
        result?.posts
          ? [
              ...result.posts.map(({ id }: { id: string }) => ({
                type: "Post" as const,
                id,
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getRecentPosts: builder.query({
      query: ({ lastPostDate, limit }) => ({
        url: "/posts/recent",
        params: {
          lastPostDate,
          limit,
        },
      }),
      providesTags: (result) =>
        result && result.posts
          ? [
              ...result.posts.map(({ id }: { id: string }) => ({
                type: "Post",
                id,
              })),
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
    getUserLikedPosts: builder.query({
      query: ({ id, offset, limit }) => ({
        url: `/users/${id}/liked-posts`,
        params: { offset, limit },
      }),
      providesTags: (result, error, { id }) => [
        { type: "UserLikedPosts", id },
        ...(result?.likedPosts?.map(({ id }: { id: string }) => ({
          type: "Post",
          id,
        })) || []),
      ],
    }),
    likePost: builder.mutation({
      query: ({ userId, postId }) => ({
        url: `/posts/like`,
        method: "PUT",
        body: { userId, postId },
      }),
      invalidatesTags: (result, error, { userId, postId }) => [
        { type: "Post", id: postId },
        { type: "User", id: userId },
        { type: "Post", id: "LIST" },
        { type: "UserLikedPosts", id: userId },
      ],
    }),

    unlikePost: builder.mutation({
      query: (body) => ({
        url: `/posts/unlike`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { userId, postId }) => [
        { type: "Post", id: postId },
        { type: "User", id: userId },
        { type: "Post", id: "LIST" },
        { type: "UserLikedPosts", id: userId },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useGetRecentPostsQuery,
  useLazyGetRecentPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetUserPostsQuery,
  useGetUserLikedPostsQuery,
} = postApi;
