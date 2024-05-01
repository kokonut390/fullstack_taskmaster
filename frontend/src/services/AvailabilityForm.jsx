import React, {useEffect, useState} from "react";
import axios from "axios";
const baseUrl = `https://final-liangyu.onrender.com/availability`



function AvailabilityForm ({initialSlots = []}){
    const [submittedSlots, setSubmittedSlots] = useState(initialSlots)
    const [overlaps, setOverlaps] = useState([])

    const [name, setName] = useState('')
    const [slots, setSlots] = useState([])

    const [day, setDay] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    useEffect(() => {
        if (initialSlots.length > 0)
    }, [initialSlots]);

    const addSlot = () => {
        const newSlot = {name, day, startTime, endTime}
        setSlots(prevSlots => [...prevSlots, newSlot])
        setDay('')
        setStartTime('')
        setEndTime('')
    }


    const deleteSlot = (index) => {
        setSlots(prevSlots => prevSlots.filter((_, idx) => idx !== index))
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        try {
            const response = await axios.post(baseUrl, {
                name,
                availableSlots: slots
            })
            console.log('Availability added/updated:', response.data)
            setSubmittedSlots(prevSlots => [...prevSlots, ...slots])
            setOverlaps(findOverlappingSlots([...submittedSlots, ...slots]))
            setSlots([])
        }catch (err){
            console.error('Error updating availability:', err)
        }
    }

    const findOverlappingSlots = (slots) => {
        let overlaps = []
        for (let i = 0; i < slots.length; i++ ){
            for (let j = i + 1; j < slots.length; j++){
                if(slots[i].day === slots[j].day){ //make sure it's the same day
                    const start1 = new Date(`01/01/2020 ${slots[i].startTime}`)
                    const end1 = new Date(`01/01/2020 ${slots[i].endTime}`)
                    const start2 = new Date(`01/01/2020 ${slots[j].startTime}`)
                    const end2 = new Date(`01/01/2020 ${slots[j].endTime}`)

                    if (start1 < end2 && start2 < end1 ){
                        const overlapStart = new Date(Math.max(start1.getTime(), start2.getTime())).toLocaleTimeString()
                        const overlapEnd = new Date(Math.min(end1.getTime(), end2.getTime())).toLocaleTimeString()
                        overlaps.push({
                            names: [slots[i].name, slots[j].name],
                            day: slots[i].day,
                            startTime: overlapStart,
                            endTime: overlapEnd
                        })
                    }
                }
            }
        }
        return overlaps
    }

    return(
        <>
            <h2>Set Availability</h2>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </label>
            </div>
            <div>
                <label>
                    Day:
                    <input type="date" value={day} onChange={e => setDay(e.target.value)}/>
                </label>
                <label>
                    Start Time:
                    <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} step="300"/>
                </label>
                <label>
                    End Time:
                    <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} step="300"/>
                </label>
            </div>
            <button type="button" onClick={addSlot}>Add Time Slot</button>
            <div>
                <h3>Current Time Slots:</h3>
                {slots.map((slot, index) => (
                    <div key={index}>
                        {slot.name} - {slot.day} {slot.startTime} - {slot.endTime}
                        <button onClick={() => deleteSlot(index)}>Delete</button>
                    </div>
                ))}
            </div>
            <button type="submit" onClick={handleSubmit}>Submit All Time Slots</button>
            <div>
                <h3>Submitted Availability Time Slots:</h3>
                {submittedSlots.map((slot, index) => (
                    <div key={index}>
                        {slot.name} - {slot.day} {slot.startTime} - {slot.endTime}
                    </div>
                ))}
            </div>
            <div>
                <h3>Overlapping Time Slots:</h3>
                {overlaps.map((overlap, index) => (
                    <div key={index}>
                        {overlap.names.join(' & ')} - {overlap.day} {overlap.startTime} - {overlap.endTime}
                    </div>
                ))}
            </div>
        </>
    )
}

export default AvailabilityForm