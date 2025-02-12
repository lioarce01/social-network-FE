import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../lib/Auth0Config"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User", "Followers", "Following", "Post"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    registerUser: builder.mutation<void, void>({
      query: () => ({
        url: "/users",
        method: "POST",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    getMe: builder.query({
      query: () => `/users/me`,
      providesTags: (result, error, { id }) => [{ type: "User", id }]
    }),
    getUserBySub: builder.query({
      query: (identifier) => `/users/${identifier}`,
      providesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    //PROFILE SETTINGSg
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
    //PROFILE SETTINGS
    deleteUser: builder.mutation<void, void>({
      query: () => ({
        url: `/users/delete`,
        method: "DELETE",
      }),
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
      invalidatesTags: (result, error, { userId, targetId }) => [
        { type: "User", id: userId },
        { type: "User", id: targetId },
        { type: "Followers", id: "LIST" },
        { type: "Following", id: "LIST" },
      ],
    }),

    unfollowUser: builder.mutation({
      query: (body) => ({
        url: "/users/unfollow",
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: (result, error, { userId, targetId }) => [
        { type: "User", id: userId },
        { type: "User", id: targetId },
        { type: "Followers", id: "LIST" },
        { type: "Following", id: "LIST" },
      ],
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

    getUserFollowers: builder.query({
      query: ({ id, offset, limit }) => ({
        url: `/users/${id}/followers`,
        params: { offset, limit },
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.followers.map(({ id }: { id: string }) => ({
              type: "User" as const,
              id,
            })),
            { type: "Followers", id: "LIST" },
          ]
          : [{ type: "Followers", id: "LIST" }],
    }),

    getUserFollowing: builder.query({
      query: ({ id, offset, limit }) => ({
        url: `/users/${id}/following`,
        params: { offset, limit },
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.following.map(({ id }: { id: string }) => ({
              type: "User" as const,
              id,
            })),
            { type: "Following", id: "LIST" },
          ]
          : [{ type: "Following", id: "LIST" }],
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
  useGetUserFollowingQuery,
  useGetUserFollowersQuery,
  useGetMeQuery
} = userApi;
