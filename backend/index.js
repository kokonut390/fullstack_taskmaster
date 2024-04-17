const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");


const app = express();
const cors = require('cors');
app.use(cors());
const password = process.argv[2]

const url = `mongodb+srv://comp227:${password}@cluster0.rt7kzix.mongodb.net/schedule?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
    .then(()=>{console.log("Connected to MongoDB")})
    .catch((error)=>{console.log(error.message)});

// Meme Schema
const scheduleSchema = new mongoose.Schema({
    id: String,
    name: String,
    date: String
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

app.use(bodyParser.json());

// Routes
app.get('/schedule', async (req, res) => {
    try {
        const schedules = await Schedule.find({});
        res.json(schedules);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/schedule', async (req, res) => {
    const { id, name, date } = req.body;
    try {
        const newSchedule = new Schedule({ id, name, date });
        await newSchedule.save();
        res.status(201).json(newSchedule);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.put('/schedule', async (req, res) => {
    const {id, name, date} =req.body
    try{
        const updatedSchedule = await Schedule.findOneAndUpdate(
            {id: id},
            {name, date},
            {new: true}
        )
        if (updatedSchedule){
            res.json(updatedSchedule)
        }else {
            res.status(404).json({message: 'Schedule not found'})
        }
    }catch (err){
        console.error(err)
        res.status(500).json({message: 'Server error'})
    }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
