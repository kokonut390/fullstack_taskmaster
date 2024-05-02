import { useState, useEffect } from 'react';
import ScheduleList from './services/ScheduleList.jsx';
import ScheduleForm from './services/ScheduleForm.jsx';
import AvailabilityForm from './services/AvailabilityForm.jsx';
const baseUrl = `https://final-liangyu.onrender.com`;

import axios from "axios";
import './index.css';

function App() {
    const [overlaps, setOverlaps] = useState([])
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
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    function groupByPersonName(data) {
        return data.reduce((acc, item) => {
            const name = item.name || "Unnamed"
            if (Array.isArray(item.availableSlots)) {
                if (acc[name]) {
                    acc[name] = [...acc[name], ...item.availableSlots.map(slot => ({ ...slot, name }))];
                } else {
                    acc[name] = item.availableSlots.map(slot => ({ ...slot, name }));
                }
            } else {
                acc[name] = acc[name] || [];
            }
            return acc;
        }, {});
    }

    const fetchAvailability = async () => {
        try {
            const response = await axios.get(`${baseUrl}/availability`);
            console.log(response.data)
            const groupedData = groupByPersonName(response.data)
            setAvailability(groupedData);

            setOverlaps(findOverlappingSlots(groupedData))
        } catch (error) {
            console.error('Error fetching availability:', error);
        }
    };

    useEffect(() => {
        fetchSchedules();
        fetchAvailability();
    }, []);

    const findOverlappingSlots = (availabilityData) => {
        let  overlaps = []
        const allSlots = Object.values(availabilityData).flat()
        for (let i = 0; i < allSlots.length; i++) {
            for (let j = i + 1; j < allSlots.length; j++) {
                if (allSlots[i].day === allSlots[j].day) {
                    const start1 = new Date(`01/01/2020 ${allSlots[i].startTime}`);
                    const end1 = new Date(`01/01/2020 ${allSlots[i].endTime}`);
                    const start2 = new Date(`01/01/2020 ${allSlots[j].startTime}`);
                    const end2 = new Date(`01/01/2020 ${allSlots[j].endTime}`);

                    if (start1 < end2 && start2 < end1) {
                        const overlapStart = new Date(Math.max(start1.getTime(), start2.getTime())).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
                        const overlapEnd = new Date(Math.min(end1.getTime(), end2.getTime())).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
                        overlaps.push({
                            names: [allSlots[i].name, allSlots[j].name],
                            day: allSlots[i].day,
                            startTime: overlapStart,
                            endTime: overlapEnd
                        });
                    }
                }
            }
        }
        return overlaps;
    }

    return (
        <div>
            <button onClick={toggleDarkMode} style={{position: 'fixed', top: '10px', right: '10px'}}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <h1>Schedule Manager</h1>
            <ScheduleForm fetchSchedules={fetchSchedules}/>
            <ScheduleList schedules={schedules} fetchSchedules={fetchSchedules}/>
            <AvailabilityForm initialSlots={submittedSlots} fetchAvailability={fetchAvailability}/>
            <div>
                <h2>Available Time Slots</h2>
                {Object.entries(availability).map(([name, slots], index) => (
                    <div key={index}>
                        <h3>{name || "Unnamed"}</h3>
                        {Array.isArray(slots) && slots.length > 0 ? slots.map((slot, idx) => (
                            <div key={idx}>
                                {slot.day} - From {slot.startTime} to {slot.endTime}
                            </div>
                        )) : <p>No slots available</p>}
                    </div>
                ))}
            </div>
            <div>
                <h2>Overlapping Time Slots:</h2>
                {overlaps.map((overlap, index) => (
                    <div key={index}>
                        {overlap.names.join(' & ')} - {overlap.day} {overlap.startTime} - {overlap.endTime}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;