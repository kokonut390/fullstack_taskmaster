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
        setSlots()
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const slot = {day, startTime, endTime}

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