import { useState, useEffect } from 'react'
import './index.css'
import ScheduleList from './services/ScheduleList.jsx'
import ScheduleForm from './services/ScheduleForm.jsx'

function App() {
    return (
        <div>
            <h1>Schedule Manager</h1>
            <ScheduleForm />
            <ScheduleList />
        </div>
    );
}

export default App