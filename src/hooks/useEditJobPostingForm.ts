import { useState, useEffect } from "react";
import {
  useUpdateJobPostingMutation,
  useGetJobByIdQueryQuery,
} from "@/redux/api/jobPostingApi";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export interface JobPostingFormData {
  title: string;
  description: string;
  budget: number;
  deadline: string;
  techRequired: string[];
  category: string;
  location: string;
  mode: "REMOTE" | "HYBRID" | "ONSITE";
}

export function useEditJobPostingForm(jobId: string) {
  const router = useRouter();
  const { toast } = useToast();
  const [updateJobPosting, { isLoading: isUpdating }] =
    useUpdateJobPostingMutation();
  const { data: jobDetails, isLoading: isLoadingJob } =
    useGetJobByIdQueryQuery(jobId);

  const [formData, setFormData] = useState<JobPostingFormData>({
    title: "",
    description: "",
    budget: 0,
    deadline: "",
    techRequired: [],
    category: "",
    location: "",
    mode: "REMOTE",
  });

  const [techInput, setTechInput] = useState("");

  interface JobPostingFormErrors
    extends Omit<Partial<JobPostingFormData>, "deadline" | "budget"> {
    deadline?: string;
    budget?: string;
  }

  const [errors, setErrors] = useState<JobPostingFormErrors>({});

  useEffect(() => {
    if (jobDetails) {
      setFormData({
        title: jobDetails.title,
        description: jobDetails.description,
        budget: jobDetails.budget,
        deadline: new Date(jobDetails.deadline).toISOString().split("T")[0],
        techRequired: jobDetails.techRequired,
        category: jobDetails.category,
        location: jobDetails.location,
        mode: jobDetails.mode,
      });
    }
  }, [jobDetails]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "budget" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        deadline: date.toISOString().split("T")[0],
      }));
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
      setErrors((prev) => ({ ...prev, techRequired: [] }));
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

  const validateForm = () => {
    const newErrors: JobPostingFormErrors = {};
    if (formData.title.length < 5)
      newErrors.title = "Title must be at least 5 characters long";
    if (formData.description.length < 20)
      newErrors.description = "Description must be at least 20 characters long";
    if (isNaN(formData.budget) || formData.budget <= 0)
      newErrors.budget = "Budget must be a positive number";
    if (new Date(formData.deadline) < new Date())
      newErrors.deadline = "Deadline must be in the future";
    if (formData.techRequired.length === 0)
      newErrors.techRequired = ["At least one technology is required"];
    if (formData.category.length === 0)
      newErrors.category = "Category is required";
    if (formData.location.length === 0)
      newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const updateData: Partial<
          Omit<any, "applicants" | "jobAuthor" | "id">
        > = {
          title: formData.title,
          description: formData.description,
          budget: formData.budget,
          deadline: new Date(formData.deadline).toISOString(),
          techRequired: formData.techRequired,
          category: formData.category,
          location: formData.location,
          mode: formData.mode,
        };

        await updateJobPosting({
          id: jobId,
          data: updateData,
        }).unwrap();

        toast({
          title: "Success",
          description: "Job posting updated successfully",
        });
        router.push(`/jobpostings/${jobId}`);
      } catch (error) {
        console.error("Failed to update job posting:", error);
        toast({
          title: "Error",
          description: "Failed to update job posting",
          variant: "destructive",
        });
      }
    }
  };

  return {
    formData,
    techInput,
    errors,
    isLoading: isLoadingJob || isUpdating,
    handleInputChange,
    handleDateChange,
    setTechInput,
    addTech,
    removeTech,
    handleModeChange,
    handleSubmit,
  };
}
