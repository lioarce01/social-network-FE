import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Auth0Client } from "@auth0/auth0-spa-js";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUDIENCE = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE
const SCOPE = process.env.NEXT_PUBLIC_AUTH0_SCOPE

export const auth0Client = new Auth0Client({
  domain: `${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}`,
  clientId: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`,
  authorizationParams: {
    audience: AUDIENCE,
    redirect_uri: typeof window !== "undefined" ? window.location.origin : "",
  },
  cacheLocation: "localstorage",
  useRefreshTokens: true,
});

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: async (headers) =>
  {
    try {
      const token = await auth0Client.getTokenSilently({
        detailedResponse: true,
        authorizationParams: {
          audience: `${AUDIENCE}`,
          scope: `${SCOPE}`
        }
      });

      if (token) {
        console.log("token:", token.access_token)
        headers.set("Authorization", `Bearer ${token.access_token}`);
        headers.set('Content-Type', 'application/json');
      }
    } catch (error) {
      console.error("Error obteniendo token:", error);
      if (typeof window !== "undefined" && (error as { error: string }).error === "login_required") {
        await auth0Client.loginWithRedirect();
      }
    }
    return headers;
  },
});

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
