import React, { useState } from 'react';
import axios from 'axios';
const baseUrl = `http://localhost:3001/schedule`

function ScheduleForm(props) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(baseUrl, { name, date });
            console.log('Schedule added/updated:', response.data);
            // Clear form
            setId('');
            setName('');
            setDate('');
            props.fetchSchedules()
        } catch (error) {
            if (error.response && error.response.status === 400){
                setError(error.response.data.message)
            }
            console.error('Error adding/updating schedule:', error);
            setError()
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add/Update Schedule</h2>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
            />
            <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                placeholder="Date"
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default ScheduleForm;
