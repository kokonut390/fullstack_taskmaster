import { useState, useEffect } from 'react'
import ScheduleList from './services/ScheduleList.jsx'
import ScheduleForm from './services/ScheduleForm.jsx'

function App() {
    const addSchedule = (newSchedule) => {
        setSchedules(prevSchedules => [...prevSchedules, newSchedule]);
    };

    return (
        <div>
            <h1>Schedule Manager</h1>
            <ScheduleForm />
            <ScheduleList />
        </div>
    );
}

export default App