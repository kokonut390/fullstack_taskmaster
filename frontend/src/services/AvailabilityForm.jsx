import React, {useState} from "react";
import axios from "axios";
const baseUrl = `https://final-liangyu.onrender.com/availability`

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    const weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);

    return weekNo;
}


function AvailabilityForm (){
    const [weekNumber, setWeekNumber] = useState(getWeekNumber(new Date()))
    const [availableSlots, setAvailableSlots] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(baseUrl, {
                weekNumber,
                availableSlots
            })
            console.log('Availability added/updated:', response.data)
        }catch (err){
            console.error('Error updating availability:', err)
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <h2>Set Availability</h2>
            <button type="submit">Submit</button>
        </form>
    )
}

export default AvailabilityForm