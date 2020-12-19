import React, { useState } from 'react'
import ScheduleSelect from './ScheduleSelect'
import ScheduleView from './ScheduleView'

const EmployeeSchedule = () => {
    
    const [employeeId, setEmployeeId] = useState();
    
    return (
        <>
            <ScheduleSelect onEmployeeChange={setEmployeeId} />
            {employeeId && <ScheduleView employeeId={employeeId} />}
        </>
    )
}

export default EmployeeSchedule