import { useState, useEffect } from 'react'
import ScheduleList from './services/ScheduleList.jsx'
import ScheduleForm from './services/ScheduleForm.jsx'
import AvailabilityForm from './services/AvailabilityForm.jsx'
const baseUrl = `https://final-liangyu.onrender.com`
import axios from "axios";
import './index.css'

function App() {
    const [availability, setAvailability] = useState([])
    const [schedules, setSchedules] = useState([]);
    const [darkMode, setDarkMode] = useState(false)


    const toggleDarkMode = () => setDarkMode(!darkMode)
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

    useEffect(() => {
        fetchSchedules();
    }, []);

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const response = await axios.get(`${baseUrl}/availability`)
                console.log(response.data)
            }catch (err){
                console.error('Error fetching availability:', err)
            }
        }
        fetchAvailability()
    }, []);

    return (
        <div>
            <button onClick={toggleDarkMode} style={{position:'fixed', top:'10px', right:'10px'}}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <h1>Schedule Manager</h1>
            <ScheduleForm fetchSchedules={fetchSchedules}/>
            <ScheduleList schedules={schedules} fetchSchedules={fetchSchedules}/>
            <AvailabilityForm />
        </div>
    );
}

export default App