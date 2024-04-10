import { useState, useEffect } from 'react'

function App() {
    const [schedules, setSchedules] = useState([])
    const 


    useEffect(()=> {
        fetch('http://localhost:3001/schedule')
            .then(response => response.json())
            .then(data => setSchedules(data))
            .catch(error => console.error('There is an error!', error))
    })
  return (
      <div>
          <h1>Schedule</h1>
          <ul>
              {schedules.map(schedule => (
                  <li key = {schedule.id}>{schedule.name} - {schedule.date}</li>
              ))}
          </ul>
      </div>
  )
}

export default App
