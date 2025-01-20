import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type UpdateJobPostingData = Partial<
  Omit<any, "applicants" | "jobAuthor" | "id">
>;

export const jobPostingApi = createApi({
  reducerPath: "jobPostingApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["JobPosting"],
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (params) => ({
        url: "/jobpostings",
        params: {
          offset: params.offset || 0,
          limit: params.limit || 10,
          sortBy: params.sortBy || "createdAt",
          sortOrder: params.sortOrder || "desc",
        },
      }),
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
      }),
      invalidatesTags: (result, error, id) => [
        { type: "JobPosting", id: "LIST" },
      ],
    }),
    updateJobPosting: builder.mutation<
      any,
      { id: string; data: UpdateJobPostingData }
    >({
      query: ({ id, data }) => ({
        url: `/jobpostings/${id}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "JobPosting", id }],
    }),
    switchStatus: builder.mutation({
      query: (id) => ({
        url: `/jobpostings/${id}/change-status`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [{ type: "JobPosting", id }],
    }),
    deleteJobPosting: builder.mutation({
      query: (id) => ({
        url: `/jobpostings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "JobPosting", id }],
    }),
    applyJob: builder.mutation({
      query: (body) => ({
        url: "/jobapplications/applyjob",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "JobPosting", id }],
    }),
    getJobApplicants: builder.query({
      query: (id) => `/jobpostings/${id}/applicants`,
      providesTags: (result, error, id) => [{ type: "JobPosting", id }],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQueryQuery,
  useCreateJobMutation,
  useUpdateJobPostingMutation,
  useSwitchStatusMutation,
  useDeleteJobPostingMutation,
  useApplyJobMutation,
  useGetJobApplicantsQuery,
} = jobPostingApi;
