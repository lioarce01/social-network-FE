import CreateServiceComponent from '@/components/service/createService'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const CreateService = () => {
  return (
    <div className="pt-2 w-full px-4">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/services">← Back to Services</Link>
        </Button>
        <CreateServiceComponent />;
      </div>
    </div>
    )
}

export default CreateService