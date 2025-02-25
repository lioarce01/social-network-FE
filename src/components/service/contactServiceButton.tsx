import React from 'react'
import { Button } from '../ui/button';

interface ContactServiceButtonProps {
    serviceStatus: string
}

const ContactServiceButton = ({serviceStatus}: ContactServiceButtonProps) => {

    const getButtonLabel = () => {
        // if (isApplying) return "Applying...";
        // if (jobDetails?.status === "CLOSED") return "Closed";
        // if (applied) return "Applied";
        return "Contact";
      };

  return (
    <>
      <div>
        <Button
          disabled={serviceStatus === "CLOSED"}
          className="w-full sm:w-auto"
        >
          {getButtonLabel()}
        </Button>
      </div>
    </>
  )
}

export default ContactServiceButton