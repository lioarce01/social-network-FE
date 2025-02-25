import { validateServiceForm } from "@/lib/utils";
import { useCreateServiceMutation } from "@/redux/api/serviceApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


export interface ServiceFormData
{
    title: string;
    description: string;
    skills: string[];
    price: string;
}

export function useServiceForm()
{
    const [createService, { isLoading }] = useCreateServiceMutation();
    const [formData, setFormData] = useState<ServiceFormData>({
        title: "",
        description: "",
        skills: [],
        price: "",
    });
    const [skillInput, setSkillInput] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const router = useRouter()

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) =>
    {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const addSkill = () =>
    {
        if (skillInput.trim() === "") return;
        setFormData((prev) => ({
            ...prev,
            skills: [...prev.skills, skillInput.trim()],
        }));
        setSkillInput("");
        setErrors((prev) => ({ ...prev, skills: "" }));
    };

    const removeSkill = (skill: string) =>
    {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s !== skill),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault()
        const errors = validateServiceForm(formData);
        setErrors(errors)

        if (Object.keys(errors).length === 0) {
            try {
                await createService({
                    ...formData,
                    price: Number(formData.price),
                }).unwrap();
                setFormData({
                    title: "",
                    description: "",
                    skills: [],
                    price: "",
                });

                router.back()

            } catch (error) {
                if (error instanceof Error) {
                    console.error("Failed to create service:", error.message);
                } else {
                    console.error("Failed to create service:", error);
                }
            }
        }
    };

    return {
        formData,
        errors,
        isLoading,
        skillInput,
        setSkillInput,
        handleInputChange,
        addSkill,
        removeSkill,
        handleSubmit,
    };
}