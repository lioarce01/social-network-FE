import { useSwitchServiceStatusMutation } from '@/redux/api/serviceApi'
import React from 'react'

interface SwitchServiceStatusProps {
    serviceId: string
    serviceDetails: any
}

const SwitchServiceStatus = ({serviceId, serviceDetails}: SwitchServiceStatusProps) => {

    const [switchStatus, { isLoading: isSwitching }] = useSwitchServiceStatusMutation()
  
    const handleStatus = async () => {
        await switchStatus(serviceId).unwrap()
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