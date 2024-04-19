import React, { useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl = `http://localhost:3001/schedule`

function ScheduleList({ schedules, fetchSchedules}) {
    const handleDelete = async (_id) => {
        try {
            const response = await axios.delete(`${baseUrl}/${_id}`)
            console.log('Schedule deleted:', response.data)
            fetchSchedules()
        }catch (error){
            console.error('Error deleting schedules:', error)
        }
    }
    return (
        <div>
            <h2>Assignments</h2>
            <ul>
                {schedules.map((schedule) => (
                    <li key={schedule._id}>
                        {schedule.name} - {schedule.date}
                        <button onClick={() => handleDelete(schedule._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScheduleList;
