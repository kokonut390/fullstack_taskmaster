import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ScheduleList() {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get('http://localhost:3001/schedule');
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <div>
            <h2>Schedules</h2>
            <ul>
                {schedules.map(schedule => (
                    <li key={schedule.id}>{schedule.name} - {schedule.date}</li>
                ))}
            </ul>
        </div>
    );
}

export default ScheduleList;