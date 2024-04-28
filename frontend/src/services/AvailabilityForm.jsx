import React, {useState} from "react";
import axios from "axios";
const baseUrl = `https://final-liangyu.onrender.com/availability`
/*
const baseUrl = `https://final-liangyu.onrender.com/availability`
*/



function AvailabilityForm (){
    const [slots, setSlots] = useState([])

    const [day, setDay] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    const addSlot = () => {
        const newSlot = {day, startTime, endTime}
        setSlots([...slots, newSlot])
        setDay('')
        setStartTime('')
        setEndTime('')
    }
    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post(baseUrl, {
                availableSlots: slots
            })
            console.log('Availability added/updated:', response.data)
            setSlots([])
        }catch (err){
            console.error('Error updating availability:', err)
        }
    }

    const deleteSlot = 
    return(
        <>
        <form onSubmit={handleSubmit}>
            <h2>Set Availability</h2>
            <label>
                Day:
                <input type="date" value={day} onChange={e => setDay(e.target.value)}/>
            </label>
            <label>
                Start Time:
                <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)}/>
            </label>
            <label>
                End Time:
                <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)}/>
            </label>
            <button type="button" onClick={addSlot}>Add Time Slot</button>
            <button type="submit">Submit</button>
        </form>
        <div>
            <h3>Availability Time Slots:</h3>
            {slots.map((slot, index) => (
                <div key={index}>
                    {slot.day} {slot.startTime} - {slot.endTime}
                </div>
            ))}
        </div>
        </>
    )
}

export default AvailabilityForm