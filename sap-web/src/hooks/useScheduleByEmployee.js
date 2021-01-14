import { useEffect } from "react";
import { useState } from "react";
import customAxios from "../utils/axios";

export function useScheduleByEmployee(id) {
    const [schedule, setSchedule] = useState([])

    useEffect(() => {
        customAxios.get(`/employeeSchedule/by-employee/${id}`)
            .then(schedules => setSchedule(schedules.data.schedules))
            .catch(e => console.log(e));
    }, [id])

    return schedule;
}