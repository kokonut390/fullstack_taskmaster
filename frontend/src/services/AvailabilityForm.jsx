import React, {useEffect, useState} from "react";
import axios from "axios";
const baseUrl = `https://final-liangyu.onrender.com/availability`



function AvailabilityForm({ onAddAvailability }) {
    const [name, setName] = useState('');
    const [day, setDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [slots, setSlots] = useState([]);

    const addSlot = () => {
        setSlots([...slots, { name, day, startTime, endTime }]);
        setName('');
        setDay('');
        setStartTime('');
        setEndTime('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddAvailability(slots);
        setSlots([]);
    };

    return (
        <>
            <h2>Set Availability</h2>
            <div>
                <label>Name:<input type="text" value={name} onChange={e => setName(e.target.value)} /></label>
                <label>Day:<input type="date" value={day} onChange={e => setDay(e.target.value)} /></label>
                <label>Start Time:<input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} /></label>
                <label>End Time:<input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} /></label>
            </div>
            <button onClick={addSlot}>Add Time Slot</button>
            <button onClick={handleSubmit}>Submit All Time Slots</button>
        </>
    );
}

export default AvailabilityForm;