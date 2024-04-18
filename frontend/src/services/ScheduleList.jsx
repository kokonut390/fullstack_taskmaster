import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ScheduleList() {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get('/schedule');
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const deleteSchedule = async (id) => {
        try {
            const response = await 
        }
    }



    return (
        <div>
            <h2>Schedules</h2>
            <ul>
                {schedules.map((schedule, index) => (
                    <li key={index}>{schedule.name} - {schedule.date}</li>
                ))}
            </ul>
        </div>
    );
}

export default ScheduleList;
