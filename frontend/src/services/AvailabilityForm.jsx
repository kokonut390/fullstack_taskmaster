import React, {useState} from "react";
import axios from "axios";
const baseUrl = `http://localhost:3001/availability`

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}


function AvailabilityForm ({userId}){
    const [weekNumber, setWeekNumber] = useState()
    const [availableSlots, setAvailableSlots] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post(`${baseUrl}/availability`, {
                userId,
                weekNumber,
                availableSlots
            })
            console.log('Availability added/updated:', event.data)
        }catch (err){
            console.error('Error updating availability:', err)
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
        </form>
    )
}

export default AvailabilityForm