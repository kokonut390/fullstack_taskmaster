import { useState, useEffect } from 'react';
import ScheduleList from './services/ScheduleList.jsx';
import ScheduleForm from './services/ScheduleForm.jsx';
import AvailabilityForm from './services/AvailabilityForm.jsx';
const baseUrl = `https://final-liangyu.onrender.com`;

import axios from "axios";
import './index.css';

function App() {
    const [availability, setAvailability] = useState([]);
    const [submittedSlots, setSubmittedSlots] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => setDarkMode(!darkMode);
    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    }, [darkMode]);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get(`${baseUrl}/schedule`);
            const groupedData = groupByPersonName(response.data)
            setSchedules(groupedData);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    function groupByPersonName ()

    const fetchAvailability = async () => {
        try {
            const response = await axios.get(`${baseUrl}/availability`);
            console.log(response.data)
            setAvailability(response.data);
        } catch (error) {
            console.error('Error fetching availability:', error);
        }
    };

    useEffect(() => {
        fetchSchedules();
        fetchAvailability();
    }, []);

    return (
        <div>
            <button onClick={toggleDarkMode} style={{position:'fixed', top:'10px', right:'10px'}}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <h1>Schedule Manager</h1>
            <ScheduleForm fetchSchedules={fetchSchedules}/>
            <ScheduleList schedules={schedules} fetchSchedules={fetchSchedules}/>
            <AvailabilityForm initialSlots={submittedSlots} fetchAvailability={fetchAvailability}/>
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