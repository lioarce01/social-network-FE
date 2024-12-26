import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const jobPostingApi = createApi({
  reducerPath: "jobPostingApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["JobPosting"],
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/jobpostings",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({
                type: "JobPosting",
                id,
              })),
              { type: "JobPosting", id: "LIST" },
            ]
          : [{ type: "JobPosting", id: "LIST" }],
    }),
    getJobByIdQuery: builder.query({
      query: (id: string) => `/jobpostings/${id}`,
      providesTags: (result, error, id) => [{ type: "JobPosting", id }],
    }),
    createJob: builder.mutation({
      query: (body) => ({
        url: "/jobpostings",
        method: "POST",
        body,
        invalidateTags: [{ type: "JobPosting", id: "LIST" }],
      }),
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQueryQuery,
  useCreateJobMutation,
} = jobPostingApi;
