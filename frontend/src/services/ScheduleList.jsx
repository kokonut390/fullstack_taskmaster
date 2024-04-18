import React, { useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl = `http://localhost:3001/schedule`

function ScheduleList() {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get(baseUrl);
            console.log("Fetched schedules:", response.data)
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };


    return (
        <div>
            <h2>Schedules</h2>
            <ul>
                {schedules.map((schedule, index) => (
                    <li key={schedule._id}>
                        {schedule.name} - {schedule.date}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScheduleList;
