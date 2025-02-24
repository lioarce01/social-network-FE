'use client'

import { validateServiceForm } from "@/lib/utils";
import { useGetServiceByIdQuery, useUpdateServiceMutation } from "@/redux/api/serviceApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface ServiceFormData
{
    title: string;
    description: string;
    skills: string[];
    price: string;
}

export function useEditServiceForm(serviceId: string)
{
    const router = useRouter()
    const [updateService, { isLoading }] = useUpdateServiceMutation();
    const { data: serviceDetails, isLoading: isLoadingService } = useGetServiceByIdQuery(serviceId);
    const [formData, setFormData] = useState<ServiceFormData>({
        title: "",
        description: "",
        skills: [],
        price: "",
    });
    const [skillInput, setSkillInput] = useState("");

    interface ServiceFormErrors extends Omit<Partial<ServiceFormData>, "price">
    {
        price?: string;
    }

    const [errors, setErrors] = useState<ServiceFormErrors>({});

    useEffect(() =>
    {
        if (serviceDetails) {
            setFormData({
                title: serviceDetails.data.title,
                description: serviceDetails.data.description,
                skills: serviceDetails.data.skills,
                price: serviceDetails.data.price,
            });
        }
    }, [serviceDetails])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) =>
    {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const addSkill = () =>
    {
        if (skillInput.trim() !== "") {
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()],
            }));
            setSkillInput("");
            setErrors((prev) => ({ ...prev, skills: [] }));
        }
    };

    const removeSkill = (skill: string) =>
    {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s !== skill),
        }));
    }

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        const errors = validateServiceForm(formData);
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                await updateService({ id: serviceId, patch: formData }).unwrap();
                router.push(`/services/${serviceId}`);
            } catch (err) {
                console.error(err);
            }
        }
    }

    return {
        formData,
        errors,
        isLoading: isLoading || isLoadingService,
        skillInput,
        setSkillInput,
        handleInputChange,
        addSkill,
        removeSkill,
        handleSubmit,
    }
}