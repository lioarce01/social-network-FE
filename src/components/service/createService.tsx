'use client'

import { useServiceForm } from '@/hooks/useServiceForm'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Badge } from '../ui/badge'
import { X } from 'lucide-react'
import { Button } from '../ui/button'

const CreateServiceComponent: React.FC = () => {
    const {
        formData,
        errors,
        skillInput,
        setSkillInput,
        isLoading,
        handleInputChange,
        addSkill,
        removeSkill,
        handleSubmit
    } = useServiceForm()
  return (
    <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>New Service</CardTitle>
        </CardHeader>

        <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                    {/* Title */}
                    <label htmlFor='title' className='block text-sm font-medium text-gray-700'>Title</label>
                    <Input
                        id='title'
                        name='title'
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder='Enter service title'
                        className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                    )}
                </div>
                
                {/* Description */}
                <div>
                    <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description</label>
                    <Textarea
                        id='description'
                        name='description'
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder='Enter service description'
                        className={errors.description ? 'border-red-500' : ''}
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                    )}
                </div>

                {/* Skills */}
                <div>
                    <label
                    htmlFor="techRequired"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Required Technologies
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                    {formData.skills.map((tech, index) => (
                        <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                        >
                        {tech}
                        <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeSkill(tech)}
                        />
                        </Badge>
                    ))}
                    </div>
                    <div className="flex gap-2">
                    <Input
                        id="skillInput"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addSkill())
                        }
                        placeholder="Add technology"
                        className={errors.techRequired ? "border-red-500" : ""}
                    />
                    <Button type="button" onClick={addSkill}>
                        Add
                    </Button>
                    </div>
                    {errors.skills && (
                    <p className="mt-1 text-sm text-red-500">{errors.techRequired}</p>
                    )}
                </div>

                {/* Price */}
                <div>
                    <label htmlFor='price' className='block text-sm font-medium text-gray-700'>Price p/hour</label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder='Enter price'
                        className={errors.price ? 'border-red-500' : ''}
                    />
                    {errors.budget && (
                        <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
                    )}
                </div>

                <Button type="submit" disabled={isLoading} className='w-full'>
                    {isLoading ? "Creating..." : "Create Service"}
                </Button>
            </form>
        </CardContent>
    </Card>
  )
}

export default CreateServiceComponent