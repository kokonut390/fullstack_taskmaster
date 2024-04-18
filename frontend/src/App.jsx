import { useState, useEffect } from 'react'
import ScheduleList from './services/ScheduleList.jsx'
import ScheduleForm from './services/ScheduleForm.jsx'


function App() {
    const [schedules, setSchedules] = useState([]);

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
            <ScheduleForm />
            <ScheduleList />
        </div>
    );
}

export default App