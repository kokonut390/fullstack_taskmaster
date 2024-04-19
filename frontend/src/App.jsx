import { useState, useEffect } from 'react'
import ScheduleList from './services/ScheduleList.jsx'
import ScheduleForm from './services/ScheduleForm.jsx'
const baseUrl = `http://localhost:3001/schedule`
import axios from "axios";

function App() {
    const [schedules, setSchedules] = useState([]);
    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => setDarkMode(!darkMode)
    const fetchSchedules = async () => {
        try {
            const response = await axios.get(baseUrl);
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    return (
        <div>
            <h1>Schedule Manager</h1>
            <ScheduleForm fetchSchedules={fetchSchedules}/>
            <ScheduleList schedules={schedules} fetchSchedules={fetchSchedules}/>
        </div>
    );
}

export default App