import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ScheduleList() {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get('http://localhost:3001//schedule');
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const deleteSchedule = async (id) => {
        try {
            const response = await axios.delete('http://localhost:3001/schedule/${id}')
            if(response.status === 200){
                setSchedules(schedules.filter(schedule => schedule.id !== id))
                console.log('Schedule deleted', response.data)
            }
        }catch (error){
            console.error('Error deleting schedule', error)
        }
    }



    return (
        <div>
            <h2>Schedules</h2>
            <ul>
                {schedules.map((schedule, index) => (
                    <li key={index}>{schedule.name} - {schedule.date}
                        <button onClick={() => deleteSchedule(schedule.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScheduleList;
