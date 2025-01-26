import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    registerUser: builder.mutation<any, any>({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    getUserBySub: builder.query({
      query: (identifier) => `/users/${identifier}`,
      providesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    //PROFILE SETTINGS
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
    //PROFILE SETTINGS
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
    //ONLY ADMIN CAN DISABLE USER
    disableUser: builder.mutation({
      query: (id) => ({
        url: `/users/disable`,
        method: "PUT",
        body: id,
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
    //ONLY ADMIN CAN SWITCH USER ROLE
    switchUserRole: builder.mutation({
      query: (id) => ({
        url: `/users/switch-role`,
        method: "PUT",
        body: id,
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
    followUser: builder.mutation({
      query: (body) => ({
        url: "/users/follow",
        method: "POST",
        body: body,
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
    unfollowUser: builder.mutation({
      query: (body) => ({
        url: "/users/unfollow",
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
    getUserApplications: builder.query({
      query: ({ id, offset, limit }) => ({
        url: `/users/${id}/applications`,
        method: "GET",
        params: { offset, limit },
      }),
      providesTags: (result): { type: "User"; id: string }[] =>
        result && result.applications
          ? [
              ...result.applications.map(({ id }: { id: string }) => ({
                type: "User" as const,
                id,
              })),
              { type: "User" as const, id: "LIST" },
            ]
          : [{ type: "User" as const, id: "LIST" }],
    }),
    getUserJobPostings: builder.query({
      query: ({ id, offset, limit }) => ({
        url: `/users/${id}/job-postings`,
        method: "GET",
        params: { offset, limit },
      }),
      providesTags: (result): { type: "User"; id: string }[] =>
        result && result.jobPostings
          ? [
              ...result.jobPostings.map(({ id }: { id: string }) => ({
                type: "User" as const,
                id,
              })),
              { type: "User" as const, id: "LIST" },
            ]
          : [{ type: "User" as const, id: "LIST" }],
    }),
    getUserLikedPosts: builder.query({
      query: ({ id, offset, limit }) => ({
        url: `/users/${id}/liked-posts`,
        method: "GET",
        params: { offset, limit },
      }),
      providesTags: (result): { type: "User"; id: string }[] =>
        result && result.jobPostings
          ? [
              ...result.jobPostings.map(({ id }: { id: string }) => ({
                type: "User" as const,
                id,
              })),
              { type: "User" as const, id: "LIST" },
            ]
          : [{ type: "User" as const, id: "LIST" }],
    }),
    getUserFollowers: builder.query({
      query: ({ id, offset, limit }) => ({
        url: `/users/${id}/followers`,
        method: "GET",
        params: { offset, limit },
      }),
      providesTags: (result): { type: "User"; id: string }[] =>
        result && result.jobPostings
          ? [
              ...result.jobPostings.map(({ id }: { id: string }) => ({
                type: "User" as const,
                id,
              })),
              { type: "User" as const, id: "LIST" },
            ]
          : [{ type: "User" as const, id: "LIST" }],
    }),
    getUserFollowing: builder.query({
      query: ({ id, offset, limit }) => ({
        url: `/users/${id}/following`,
        method: "GET",
        params: { offset, limit },
      }),
      providesTags: (result): { type: "User"; id: string }[] =>
        result && result.jobPostings
          ? [
              ...result.jobPostings.map(({ id }: { id: string }) => ({
                type: "User" as const,
                id,
              })),
              { type: "User" as const, id: "LIST" },
            ]
          : [{ type: "User" as const, id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserBySubQuery,
  useLazyGetUserBySubQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDisableUserMutation,
  useSwitchUserRoleMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetUserApplicationsQuery,
  useGetUserJobPostingsQuery,
  useGetUserLikedPostsQuery,
  useGetUserFollowingQuery,
  useGetUserFollowersQuery,
} = userApi;
