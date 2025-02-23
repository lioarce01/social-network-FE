import React from 'react'
import { Button } from '../ui/button';

const ContactServiceButton = () => {

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
        //   onClick={handleApplyJob}
        //   disabled={jobDetails?.status === "CLOSED" || applied}
          className="w-full sm:w-auto"
        >
          {getButtonLabel()}
        </Button>
      </div>
    </>
  )
}

export default ContactServiceButton