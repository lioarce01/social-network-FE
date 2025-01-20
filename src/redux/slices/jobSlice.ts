import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface Job {
  id: string;
  title: string;
  category: string;
  mode: string;
  featured: boolean;
  location: string;
  budget: string;
}

interface JobsState {
  jobs: Job[];
  totalCount: number;
}

const initialState: JobsState = {
  jobs: [],
  totalCount: 0,
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
  },
});

export const { setJobs, addJobs, setTotalCount } = jobsSlice.actions;

export const selectAllJobs = (state: RootState) => state.jobs.jobs;
export const selectTotalJobsCount = (state: RootState) => state.jobs.totalCount;

export default jobsSlice.reducer;
