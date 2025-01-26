import { Post } from "@/types/Post";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ offset, limit, sortBy, sortOrder }) => ({
        url: "/posts",
        params: {
          offset,
          limit,
          sortBy,
          sortOrder,
        },
      }),
      providesTags: (result): { type: "Post"; id: string }[] =>
        result && result.posts
          ? [
              ...result.posts.map(({ id }: { id: string }) => ({
                type: "Post" as const,
                id,
              })),
              { type: "Post" as const, id: "LIST" },
            ]
          : [{ type: "Post" as const, id: "LIST" }],
      transformResponse: (response: { posts: Post[]; totalCount: number }) => {
        return {
          posts: response.posts,
          totalCount: response.totalCount,
        };
      },
    }),
    getRecentPosts: builder.query({
      query: ({ lastPostDate, limit }) => ({
        url: "/posts/recent",
        params: {
          lastPostDate,
          limit,
        },
      }),
      providesTags: (result): { type: "Post"; id: string }[] =>
        result && result.posts
          ? [
              ...result.posts.map(({ id }: { id: string }) => ({
                type: "Post" as const,
                id,
              })),
              { type: "Post" as const, id: "LIST" },
            ]
          : [{ type: "Post" as const, id: "LIST" }],
      transformResponse: (response: { posts: Post[]; totalCount: number }) => {
        return {
          posts: response.posts,
          totalCount: response.totalCount,
        };
      },
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
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
        { type: "Post", id: "LIST" },
      ],
    }),

    unlikePost: builder.mutation({
      query: (body) => ({
        url: `/posts/unlike`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
        { type: "Post", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useGetRecentPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetUserPostsQuery,
} = postApi;
