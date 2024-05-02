import React, {useEffect, useState} from "react";
import axios from "axios";
const baseUrl = `https://final-liangyu.onrender.com/availability`



function AvailabilityForm ({initialSlots = [], fetchAvailability}){
    const [submittedSlots, setSubmittedSlots] = useState(initialSlots)
    const [overlaps, setOverlaps] = useState([])

    const [name, setName] = useState('')
    const [slots, setSlots] = useState([])

    const [day, setDay] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    useEffect(() => {
        if (initialSlots.length > 0) {
            console.log("Initializing with:", initialSlots)
            setSubmittedSlots(initialSlots)
        }
    }, [initialSlots]);

    useEffect(() => {
        fetchAvailability().then((availabilityData) => {
            if (availabilityData) {
                setSubmittedSlots(availabilityData);
                const newOverlaps = findOverlappingSlots(availabilityData);
                setOverlaps(newOverlaps);
            } else {
                console.error('Received invalid availability data:', availabilityData);
                setSubmittedSlots([]);
            }
        }).catch(error => {
            console.error('Failed to fetch availability:', error);
        });
    }, []);

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
            fetchAvailability()
        }catch (err){
            console.error('Error updating availability:', err)
        }
    }

    const calculateOverlaps = (availability) => {
        let allSlots = [];
        Object.values(availability).forEach(slots => {
            allSlots = allSlots.concat(slots);
        });
        const newOverlaps = findOverlappingSlots(allSlots);
        setOverlaps(newOverlaps);
    }

    const findOverlappingSlots = (availability) => {
        let allSlots = [];
        if (availability && typeof availability === 'object') {
            Object.values(availability).forEach(slots => {
                allSlots = allSlots.concat(slots);
            });
            let overlaps = [];
            for (let i = 0; i < allSlots.length; i++) {
                for (let j = i + 1; j < allSlots.length; j++) {
                    if (allSlots[i].day === allSlots[j].day) {
                        const start1 = new Date(`01/01/2020 ${allSlots[i].startTime}`);
                        const end1 = new Date(`01/01/2020 ${allSlots[i].endTime}`);
                        const start2 = new Date(`01/01/2020 ${allSlots[j].startTime}`);
                        const end2 = new Date(`01/01/2020 ${allSlots[j].endTime}`);
                        if (start1 < end2 && start2 < end1) {
                            const overlapStart = new Date(Math.max(start1.getTime(), start2.getTime())).toLocaleTimeString();
                            const overlapEnd = new Date(Math.min(end1.getTime(), end2.getTime())).toLocaleTimeString();
                            overlaps.push({
                                names: [allSlots[i].name, allSlots[j].name],
                                day: allSlots[i].day,
                                startTime: overlapStart,
                                endTime: overlapEnd
                            });
                        }
                    }
                }
            }
            return overlaps;
        } else {
            console.error('Invalid availability data for overlapping calculation:', availability);
            return [];
        }
    };

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
                        {slot.name} - {slot.day} from {slot.startTime} to {slot.endTime}
                        <button onClick={() => deleteSlot(index)}>Delete</button>
                    </div>
                ))}
            </div>
            <button type="submit" onClick={handleSubmit}>Submit All Time Slots</button>
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