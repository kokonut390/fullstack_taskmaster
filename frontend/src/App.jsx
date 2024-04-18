import { useState, useEffect } from 'react'
import './index.css'
import ScheduleList from './services/ScheduleList.js'
import ScheduleForm from './services/ScheduleForm.js'

function App() {

    return (
        <div>
            <button style={{position: 'absolute', top: 10, right: 10}}
                    onClick={() => setIsDarkMode(!isDarkMode)}>
                Dark Mode
            </button>
            <h1>Schedule</h1>
            <ul>
                {schedules.map(schedule => (
                    <li key = {schedule.id}>
                        {schedule.name} - {schedule.date}
                        <button onClick={() => deleteTask(schedule.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <input
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="Enter task name"
            />
            <input
                type="date"
                value={newTaskDate}
                onChange={(e) => setNewTaskDate(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
        </div>
    )
}

export default App