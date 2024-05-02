import React, { useState } from 'react';
import axios from "axios";
const baseUrl = `https://final-liangyu.onrender.com/availability`;

function AvailabilityDisplay({ availability, onNewAvailability }) {
    const [name, setName] = useState('');
    const [day, setDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newSlots = [{
            name, day, startTime, endTime
        }];
        try {
            const response = await axios.post(baseUrl, { availableSlots: newSlots });
            onNewAvailability(newSlots);
            setName('');
            setDay('');
            setStartTime('');
            setEndTime('');
        } catch (error) {
            console.error('Error submitting availability:', error);
        }
    };

    return (
        <>
            <h2>Set Availability</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
                <input type="date" value={day} onChange={e => setDay(e.target.value)} />
                <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
                <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
                <button type="submit">Submit Time Slot</button>
            </form>
            <h3>Available Time Slots:</h3>
            {availability.map((slot, index) => (
                <div key={index}>
                    {slot.name} - {slot.day} from {slot.startTime} to {slot.endTime}
                </div>
            ))}
        </>
    );
}

export default AvailabilityDisplay;
