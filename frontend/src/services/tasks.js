import axios from 'axios'
const baseUrl = '/api/schedule'

const getAllSchedules = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const createSchedules = async (newObject) => {
    const request = await axios.post(baseUrl, newObject)
    return request.data
}

const updateSchedules = async (id, newObject) => {
    const request = await axios.put(`${baseUrl}/${id}`, newObject)
    return request.data
}

const deleteSchedules = async (id) => {
    const request = await axios.delete(`${baseUrl}/${id}`);
    return request.data
}
export default { getAllSchedules, createSchedules, updateSchedules, deleteSchedules}