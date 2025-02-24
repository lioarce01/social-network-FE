'use client'
import { useEditServiceForm } from '@/hooks/useEditServiceForm';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface EditServiceProps {
    serviceId: string
}

const EditServiceComponent = ({serviceId}: EditServiceProps) => {
    const {
        formData,
        errors,
        isLoading,
        skillInput,
        setSkillInput,
        handleInputChange,
        addSkill,
        removeSkill,
        handleSubmit,
    } = useEditServiceForm(serviceId);

  return (
    <Card>
        <CardHeader>
            <CardTitle>Edit Service</CardTitle>
        </CardHeader>

        <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Title */}
                <div>
                    <label
                        htmlFor='title'
                        className='block text-sm font-medium text-gray-700'
                    >
                        Title
                    </label>
                    <Input
                        id='title'
                        name='title'
                        type='text'
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder='Enter title'
                        className={errors.title ? "border-red-500" : ""}
                        />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                    )}
                    </div>
                    
                    {/* Description */}
                    <div>
                        <label
                            htmlFor='description'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Description
                        </label>
                        <Textarea
                            id='description'
                            name='description'
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder='Enter description'
                            className={errors.description ? "border-red-500" : ""}
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                        )}
                    </div>

                    {/* Skills */}
                    <div>
                        <label
                            htmlFor='skills'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Tech stack
                        </label>
                        <div className='flex flex-wrap gap-1 mb-2'>
                        {formData.skills?.map((skill, index) => (
                            <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1"
                            >
                            {skill}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => removeSkill(skill)}
                            />
                            </Badge>
                        ))}
                        </div>
                        <div className='flex gap-2'>
                            <Input
                                id='skills'
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyPress={(e) =>
                                    e.key === "Enter" && (e.preventDefault(), addSkill())
                                }
                                placeholder="Add skill"
                                className={errors.skills ? "border-red-500" : ""}
                            />
                            <Button type="button" onClick={addSkill}>
                                Add
                            </Button>
                        </div>
                        {errors.skills && (
                            <p className="mt-1 text-sm text-red-500">{errors.skills}</p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label
                            htmlFor='price'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Price
                        </label>
                        <Input
                            id='price'
                            name='price'
                            type='number'
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder='Enter price per hour'
                            className={errors.price ? "border-red-500" : ""}
                        />
                        {errors.price && (
                            <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                        )}
                    </div>

                <Button type="submit" className='w-full' disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Service"}
                </Button>
            </form>
        </CardContent>
    </Card>
  )
}

export default EditServiceComponent