import { useState } from "react";
import { useCreateJobMutation } from "@/redux/api/jobPostingApi";
import useCurrentUser from "@/hooks/useCurrentUser";
import { validateForm } from "@/lib/utils";

export interface JobPostingFormData {
  title: string;
  description: string;
  budget: string;
  deadline: Date;
  techRequired: string[];
  category: string;
  location: string;
  mode: "REMOTE" | "HYBRID" | "ONSITE";
}

export function useJobPostingForm() {
  const { currentUser } = useCurrentUser();
  const [createJob, { isLoading }] = useCreateJobMutation();
  const [formData, setFormData] = useState<JobPostingFormData>({
    title: "",
    description: "",
    budget: "",
    deadline: new Date(),
    techRequired: [],
    category: "",
    location: "",
    mode: "REMOTE",
  });
  const [techInput, setTechInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, deadline: date }));
      setErrors((prev) => ({ ...prev, deadline: "" }));
    }
  };

  const addTech = () => {
    if (techInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        techRequired: [...prev.techRequired, techInput.trim()],
      }));
      setTechInput("");
      setErrors((prev) => ({ ...prev, techRequired: "" }));
    }
  };

  const removeTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      techRequired: prev.techRequired.filter((t) => t !== tech),
    }));
  };

  const handleModeChange = (value: "REMOTE" | "HYBRID" | "ONSITE") => {
    setFormData((prev) => ({ ...prev, mode: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await createJob({
          userId: currentUser?.id,
          ...formData,
          budget: Number(formData.budget),
        }).unwrap();
        setFormData({
          title: "",
          description: "",
          budget: "",
          deadline: new Date(),
          techRequired: [],
          category: "",
          location: "",
          mode: "REMOTE",
        });
      } catch (error) {
        console.error("Failed to create job posting:", error);
      }
    }
  };

  return {
    formData,
    techInput,
    errors,
    isLoading,
    handleInputChange,
    handleDateChange,
    setTechInput,
    addTech,
    removeTech,
    handleModeChange,
    handleSubmit,
  };
}
