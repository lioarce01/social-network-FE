import React from 'react'

interface SwitchServiceStatusProps {
    serviceId: string
    serviceDetails: any
}

const SwitchServiceStatus = ({serviceId, serviceDetails}: SwitchServiceStatusProps) => {
  
    const handleStatus = async () => {
        console.log("Switching status...")
    }
  
    return (
    <div>
        <button onClick={handleStatus} disabled={false}>
            {serviceDetails?.status === "OPEN" ? "Close Service" : "Open Service"}
        </button>
    </div>
  )
}

export default SwitchServiceStatus