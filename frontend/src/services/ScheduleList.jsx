import React, { useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl = `http://localhost:3001/schedule`

function ScheduleList({ schedules }) {
    return (
        <div>
            <h2>Schedules</h2>
            <ul>
                {schedules.map((schedule) => (
                    <li key={schedule._id}>
                        {schedule.name} - {schedule.date}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScheduleList;
