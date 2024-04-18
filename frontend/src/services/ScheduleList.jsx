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

    const deleteSchedule = async (id) => {
        console.log("Attempting to delete schedule with ID:", id)
        try {
            const response = await axios.delete(`http://localhost:3001/schedule/${id}`)
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
                    <li key={schedule._id || index}>
                        {schedule.name} - {schedule.date}
                        <button onClick={() => deleteSchedule(schedule._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScheduleList;
