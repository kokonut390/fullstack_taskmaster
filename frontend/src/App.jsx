import { useState, useEffect } from 'react'
import './index.css'


function App() {
    const [schedules, setSchedules] = useState([])
    const [newTaskName, setNewTaskName] = useState('')
    const [newTaskDate, setNewTaskDate] = useState('')
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        if(isDarkMode){
            document.body.classList.add('dark-mode')
            document.body.classList.remove('light-mode')
        }else {
            document.body.classList.add('light-mode')
            document.body.classList.remove('dark-mode')
        }
    }, [isDarkMode])


    useEffect(()=> {
        fetch('https://final-liangyu.onrender.com/schedule')
            .then(response => response.json())
            .then(data => {
                setSchedules(data)
            })
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
        if (window.confirm("Are you sure you want to delete this schedule?")){
            fetch('https://final-liangyu.onrender.com/schedule', {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(() => {
                    setSchedules(schedules.filter(schedule => schedule.id !== id))
                })
                .catch(error => console.error('Error deleting the task', error))
        }
    }


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
