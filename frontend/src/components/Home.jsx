import React, {useEffect, useState} from "react";
import {useEffect, useState} from "react";
import scheduleService from '../services/tasks.js'

const Home = () => {
    const [schedul, setSchedul] = useState()


    useEffect(() => {
        const fetchSchedules = async () => {
            const data = await scheduleService.getAllSchedules()
        }
    }, []);
}