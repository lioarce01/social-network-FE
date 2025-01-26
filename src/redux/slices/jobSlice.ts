import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Job, JobSearchParams } from "@/types/Job";

export interface JobsState {
  jobs: Job[];
  totalCount: number;
  loading: boolean;
  searchParams: JobSearchParams;
}

const initialState: JobsState = {
  jobs: [],
  totalCount: 0,
  loading: false,
  searchParams: {
    searchTerm: "",
    mode: undefined,
  },
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    addJobs: (state, action: PayloadAction<Job[]>) => {
      const newJobs = action.payload.filter(
        (newJob) =>
          !state.jobs.some((existingJob) => existingJob.id === newJob.id),
      );
      state.jobs = [...state.jobs, ...newJobs];
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSearchParams: (state, action: PayloadAction<JobSearchParams>) => {
      state.searchParams = action.payload;
    },
  },
});

export const { setJobs, addJobs, setTotalCount, setLoading, setSearchParams } =
  jobsSlice.actions;

export const selectAllJobs = (state: RootState) => state.jobs.jobs;
export const selectTotalJobsCount = (state: RootState) => state.jobs.totalCount;
export const selectLoading = (state: RootState) => state.jobs.loading;

export default jobsSlice.reducer;
