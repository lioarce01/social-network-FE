import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "/users",
          method: "POST",
          body: user,
        };
      },
    }),
    getUserBySub: builder.query({
      query: (id) => `/users/${id}`,
    }),
    //PROFILE SETTINGS
    updateUser: builder.mutation({
      query: ({ id, user }) => {
        return {
          url: `/users/${id}`,
          method: "PUT",
          body: user,
        };
      },
    }),
    //PROFILE SETTINGS
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
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
    }),
    //ONLY ADMIN CAN SWITCH USER ROLE
    switchUserRole: builder.mutation({
      query: (id) => ({
        url: `/users/switch-role`,
        method: "PUT",
        body: id,
      }),
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
} = userApi;
