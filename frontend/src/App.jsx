import { useState, useEffect } from 'react'
import ScheduleList from './services/ScheduleList.jsx'
import ScheduleForm from './services/ScheduleForm.jsx'
import AvailabilityForm from './services/AvailabilityForm.jsx'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
const baseUrl = `https://final-liangyu.onrender.com/schedule`
import axios from "axios";
import './index.css'

function App() {
    const [schedules, setSchedules] = useState([]);
    const [darkMode, setDarkMode] = useState(false)


    const toggleDarkMode = () => setDarkMode(!darkMode)
    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    }, [darkMode]);
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
        <Router>
            <nav>
                <Link to="/schedules">Schedules</Link>
                <Link to="/availability">Set Availability</Link>
            </nav>
            <Switch>
                <Route path="/schedules">
                    {/* 如果 ScheduleForm 和 ScheduleList 应显示在同一个页面 */}
                    <ScheduleForm />
                    <ScheduleList />
                </Route>
                <Route path="/availability">
                    <AvailabilityForm />
                </Route>
            </Switch>
        </Router>
    );
}

export default App