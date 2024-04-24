import React, {useState} from "react";
import {useState} from "react";
import axios from "axios";
const baseUrl = `http://localhost:3001/schedule`

function AvailabilityForm ({userId}){
    const [week, setWeek] = useState(new Date().getWeekNumber)
    const [days, setDays] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`${baseUrl}/availability`, {
                
            })
        }
    }
}