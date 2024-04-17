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

    const deleteTask = (id) => {
        fetch('https://final-liangyu.onrender.com/schedule', {
            method: 'DELETE'
        }
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
