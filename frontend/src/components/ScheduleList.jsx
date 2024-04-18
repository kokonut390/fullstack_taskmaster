import React, {useEffect, useState} from "react";
import scheduleService from "../services/tasks.js";

const ScheduleList = ({scheduleId}) => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        if (scheduleId) {
            scheduleService.getAllSchedules(scheduleId).then(response => {
                console.log("Schedules data received:", response);
                setSchedules(response || []);
            }).catch(error => {
                console.error("Error fetching schedule", error);
                setSchedules([]);
            });
        }
    }, [scheduleId]);

    if (!schedules || schedules.length === 0) {
        return <p>No schedules.</p>;
    }


    return (
        <div>
            <h2>Schedule List</h2>
            <ul>
                {schedules.map(schedule =>(
                    <li key={schedule._id}>{schedule.name} - {schedule.type}</li>
                ))}
            </ul>
        </div>
    )
}

export default ScheduleList;