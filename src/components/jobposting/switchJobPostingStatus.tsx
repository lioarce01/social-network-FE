import { useSwitchStatusMutation } from "@/redux/api/jobPostingApi";
import { useRouter } from "next/navigation";
import React from "react";

interface SwitchJobPostingStatusProps {
  jobId: string;
  jobDetails: any;
}

const SwitchJobPostingStatus: React.FC<SwitchJobPostingStatusProps> = ({
  jobId,
  jobDetails,
}) => {
  const [switchStatus, { isLoading }] = useSwitchStatusMutation();

  const router = useRouter();

  const handleSwitchStatus = async () => {
    try {
      await switchStatus(jobId).unwrap();
    } catch (error) {
      console.error("Failed to switch status:", error);
    }
  };

  return (
    <button onClick={handleSwitchStatus} disabled={isLoading}>
      {jobDetails?.status === "OPEN" ? "Close Posting" : "Open Posting"}
    </button>
  );
};

export default SwitchJobPostingStatus;
