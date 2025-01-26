export interface Job {
  id: string;
  title: string;
  category: string;
  mode: Mode;
  featured: boolean;
  location: string;
  budget: string;
}

export enum Mode {
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  ONSITE = "ONSITE",
}

export type JobSearchParams = {
  searchTerm: string;
  mode?: Mode;
};
