'use client'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useGetServiceByIdQuery } from '@/redux/api/serviceApi'
import { useParams } from 'next/navigation'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Briefcase, CalendarDays, Clock, DollarSign, MapPin, Tag } from 'lucide-react'
import { formatDate, formatDateTime } from '@/lib/utils'
import ServiceCardDropdown from './serviceCardDropdown'
import ServiceDetailSkeleton from './serviceDetailSkeleton'
import ContactServiceButton from './contactServiceButton'

const ServiceDetailComponent= () => {
    const params = useParams()
    const serviceId = params.id as string
    const { currentUser } = useCurrentUser()
    
    const {
        data: serviceDetails,
        isLoading,
        error,
    } = useGetServiceByIdQuery(serviceId, { refetchOnMountOrArgChange: true })

    if (isLoading) {
        return <ServiceDetailSkeleton/>
    }

    const formatDescription = (text: string) => {
        const lines = text.split("\n");
    
        return lines.map((line, index) => {
          if (line.trim().startsWith("-") || line.trim().startsWith("•")) {
            return (
              <li key={index} className="ml-6 list-disc">
                {line.trim().substring(1).trim()}
              </li>
            );
          }
    
          if (line.trim() === "") {
            return <div key={index} className="h-4" />;
          }
    
          return (
            <p key={index} className="mb-4">
              {line}
            </p>
          );
        });
    };

  return (
    <>
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start">
                    <div className="w-full sm:w-auto">
                        <div className="flex justify-between items-center sm:block">
                            <CardTitle className="text-3xl font-bold text-primary mb-2 sm:mb-0">
                            {serviceDetails.data.title}
                            </CardTitle>
                            
                        </div>
                    <p className="text-lg font-medium text-muted-foreground">
                        {serviceDetails.data.category}
                    </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <Badge
                        variant={serviceDetails.data.status === "OPEN" ? "default" : "secondary"}
                        className="text-sm font-semibold"
                    >
                        {serviceDetails.data.status}
                    </Badge>
                    {serviceDetails.data.authorId === currentUser?.id && (
                        <div className="hidden sm:block">
                        <ServiceCardDropdown serviceDetails={serviceDetails.data} serviceId={serviceDetails?.data?.id} />
                        </div>
                    )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm font-medium text-muted-foreground">
                    <span className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4 text-primary" />
                    {serviceDetails.data?.price}/hr
                    </span>
                    
                    <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-primary" /> Posted:{" "}
                    {formatDate(serviceDetails.data?.createdAt)}
                    </span>
                </div>

                    {/* TODO */}
                <ContactServiceButton serviceStatus={serviceDetails.data?.status}/>

                <div>
                    <h3 className="font-semibold text-xl text-primary mb-4">
                    Service Description
                    </h3>
                    <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-line">
                        {formatDescription(serviceDetails.data?.description)}
                    </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-xl text-primary mb-2">
                    Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                    {serviceDetails.data.skills.map((tech: string, index: number) => (
                        <Badge
                        key={index}
                        variant="outline"
                        className="flex items-center bg-secondary text-secondary-foreground"
                        >
                        <Tag className="mr-1 h-3 w-3" /> {tech}
                        </Badge>
                    ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    </>
  )
}

export default ServiceDetailComponent