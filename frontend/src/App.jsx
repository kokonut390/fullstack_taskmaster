import { useState, useEffect } from 'react'

function App() {
    const [schedules, setSchedules] = useState([])
    const [newTaskName, setNewTaskName] = useState('')
    const [newTaskDate, setNewTaskDate] = useState('')


    useEffect(()=> {
        fetch('https://final-liangyu.onrender.com/schedule')
            .then(response => response.json())
            .then(data => setSchedules(data))
            .catch(error => console.error('There is an error!', error))
    }, [])

    const addTask = () => {
        const newTask = {
            name: newTaskName,
            date: newTaskDate
        }
        fetch('https://final-liangyu.onrender.com/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(response => response.json())
            .then(data => {
                setSchedules([...schedules, data])
                setNewTaskName('')
                setNewTaskDate('')
            })
            .catch(error => console.error('There is an error', error))
    }


    return (
        <div>
          <h1>Schedule</h1>
          <ul>
              {schedules.map(schedule => (
                  <li key = {schedule.id}>{schedule.name} - {schedule.date}</li>
              ))}
          </ul>
            <input 
                value={newTaskName}
                onChange={(e)}
        </div>
    )
}

export default App
