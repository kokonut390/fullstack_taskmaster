import React, {useState} from "react";
import axios from "axios";
const baseUrl = `http://localhost:3001/schedule`

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
            <button type="submit"
        </form>
    )
}

export default AvailabilityForm