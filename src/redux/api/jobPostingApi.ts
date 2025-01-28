import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type UpdateJobPostingData = Partial<
  Omit<any, "applicants" | "jobAuthor" | "id">
>;

export const jobPostingApi = createApi({
  reducerPath: "jobPostingApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["JobPosting", "User"],
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (params) => ({
        url: "/jobpostings",
        params: {
          offset: params.offset || 0,
          limit: params.limit || 10,
          sortBy: params.sortBy || "createdAt",
          sortOrder: params.sortOrder || "desc",
          searchTerm: params.searchTerm,
          mode: params.mode,
        },
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        return {
          searchTerm: queryArgs.searchTerm,
          mode: queryArgs.mode,
          sortBy: queryArgs.sortBy,
          sortOrder: queryArgs.sortOrder,
        };
      },
      merge: (currentCache, newItems) => {
        if (newItems.offset === 0) {
          return newItems;
        }
        return {
          ...newItems,
          jobs: [...currentCache.jobs, ...newItems.jobs],
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.offset !== previousArg?.offset;
      },
      providesTags: (result) =>
        result.jobs
          ? [
              ...result.jobs.map(({ id }: { id: string }) => ({
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
      query: ({ userId, jobPostingId }) => ({
        url: "/jobapplications/applyjob",
        method: "POST",
        body: { userId, jobPostingId },
      }),
      invalidatesTags: (result, error, { userId, jobPostingId }) => [
        { type: "JobPosting", id: jobPostingId },
        { type: "User", id: userId },
      ],
    }),
    getJobApplicants: builder.query({
      query: ({ id, offset, limit }) => ({
        url: `/jobpostings/${id}/applicants`,
        params: { offset, limit },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.applications.map(({ id }: { id: string }) => ({
                type: "JobPosting" as const,
                id,
              })),
              { type: "JobPosting", id: "LIST" },
            ]
          : [{ type: "JobPosting", id: "LIST" }],
    }),
    rejectApplicant: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/jobapplications/${id}/reject-applicant`,
        method: "PUT",
        body: { userId },
      }),
      invalidatesTags: (result, error, { id, userId }) => [
        { type: "JobPosting", id },
        { type: "JobPosting", id: "LIST" },
      ],
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
  useRejectApplicantMutation,
} = jobPostingApi;
