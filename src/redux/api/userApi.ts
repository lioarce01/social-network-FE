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
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    getUserBySub: builder.query({
      query: (identifier) => `/users/${identifier}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
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
