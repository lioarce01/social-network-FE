import EditServiceComponent from '@/components/service/editService'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import React from 'react'

const UpdateService = ({
    params,
}: {
    params: Promise<{ id: string }> 
}) => {
    const resolvedParams = React.use(params)
  return (
    <div className="w-full p-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" asChild className="mb-6">
          <Link href={`/services/${resolvedParams.id}`}>
            ← Back to Service Details
          </Link>
        </Button>

        <div className="w-full flex justify-center">
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%]">
            <EditServiceComponent serviceId={resolvedParams.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateService