import { useState, useEffect } from 'react';
import ScheduleList from './services/ScheduleList.jsx';
import ScheduleForm from './services/ScheduleForm.jsx';
import AvailabilityForm from './services/AvailabilityForm.jsx';
const baseUrl = `https://final-liangyu.onrender.com`;

import axios from "axios";
import './index.css';

function App() {
    const [availability, setAvailability] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        fetchSchedules();
        fetchAvailability();
    }, []);

    const fetchSchedules = async () => {
        const response = await axios.get(`${baseUrl}/schedule`);
        setSchedules(response.data);
    };

    const fetchAvailability = async () => {
        const response = await axios.get(`${baseUrl}/availability`);
        setAvailability(response.data);
    };

    const handleAddAvailability = async (slots) => {
        const response = await axios.post(`${baseUrl}/availability`, { availableSlots: slots });
        if (response.status === 201) {
            fetchAvailability();  // 重新加载所有的可用时间槽
        }
    };

    return (
        <div>
            <button onClick={() => setDarkMode(!darkMode)} style={{ position: 'fixed', top: '10px', right: '10px' }}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <h1>Schedule Manager</h1>
            <ScheduleForm fetchSchedules={fetchSchedules} />
            <ScheduleList schedules={schedules} fetchSchedules={fetchSchedules} />
            <AvailabilityForm onAddAvailability={handleAddAvailability} />
            <div>
                <h2>Available Time Slots</h2>
                {availability.map((avail, index) => (
                    <div key={index}>
                        <h3>{avail.name}</h3>
                        {avail.availableSlots.map((slot, idx) => (
                            <div key={idx}>
                                {slot.day} - From {slot.startTime} to {slot.endTime}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;