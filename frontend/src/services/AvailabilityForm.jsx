import React, {useState} from "react";
import axios from "axios";
const baseUrl = `http://localhost:3001/schedule`

function AvailabilityForm ({userId}){
    const [weekN, setWeek] = useState(new Date().getWeekNumber)
    const [days, setDays] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`${baseUrl}/availability`, {
                userId,
                week,
                days
            })
            console.log('Availability added/updated:', response.data)
        }catch (err){
            console.error('Error updating availability:', err)
        }
    }
    return(
        <form onSubmit={handleSubmit}>

        </form>
    )
}

export default AvailabilityForm