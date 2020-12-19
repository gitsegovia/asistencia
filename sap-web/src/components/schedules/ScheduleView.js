import React, { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import customAxios from "../../utils/axios";

const ScheduleView = ({ employeeId }) => {
  const [schedules, setSchedules] = useState([]);

  const calendar = useRef();

  useEffect(() => {
    getSchedules(employeeId)
      .then((data) => {
        const events = data.map(buildEvent)
        setSchedules(events);
        const calendarApi = calendar.current.getApi();
        console.log(calendarApi);
      })
      .catch((e) => console.log(e));
  }, [employeeId]);

  return (
    <FullCalendar
      ref={calendar}
      events={schedules}
      locale={esLocale}
      allDaySlot={false}
      defaultView="timeGridWeek"
      plugins={[dayGridPlugin]}
    />
  );
};

function buildEvent(schedule) {
  const event = {
    daysOfWeek: [schedule.dayOfWeek.toString()],
    startTime: schedule.schedules.entryTime,
    endTime:   schedule.schedules.departureTime,
    title: schedule.schedules.name,
  };
  return event;
}

async function getSchedules(employeeId) {
  const response = await customAxios.get(
    `/employeeSchedule/by-employee/${employeeId}`
  );
  return response.data.schedules;
}

export default ScheduleView;
