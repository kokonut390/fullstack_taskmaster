    const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require("body-parser");


    const app = express();
    const cors = require('cors');
    app.use(express.static('dist'))
    app.use(cors());
    const password = process.argv[2]

    const url = `mongodb+srv://comp227:${password}@cluster0.rt7kzix.mongodb.net/schedule?retryWrites=true&w=majority&appName=Cluster0`

    mongoose.connect(url)
        .then(()=>{console.log("Connected to MongoDB")})
        .catch((error)=>{console.log(error.message)});

    //  Schema
    const scheduleSchema = new mongoose.Schema({
        name: String,
        date: String
    });

    const Schedule = mongoose.model('Schedule', scheduleSchema);

    const availabilitySchema = new mongoose.Schema({

        userId: mongoose.Schema.Types.ObjectId,
        week: Number,
        days: [{
            day: String,
            times: [{
                start: String,
                end: String
            }]
        }]
    })
    const Availability = mongoose.model('Availability', availabilitySchema)

    app.use(express.json());

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
        const { name, date } = req.body;
        try {
            const existingSchedule = await Schedule.findOne({name})
            if(existingSchedule){
                return res.status(400).json({message:'A schedule with the same name already exists.'})
            }

            const newSchedule = new Schedule({ name, date });
            await newSchedule.save();
            res.status(201).json(newSchedule);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

    app.put('/schedule', async (req, res) => {
        const {name, date} =req.body
        try{
            const updatedSchedule = await Schedule.findOneAndUpdate(
                {name},
                {$set:{date}},
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

    const ObjectId = mongoose.Types.ObjectId;

    app.delete('/schedule/:_id', async (req, res) => {
        const _id = req.params._id;
        console.log("Attempting to delete schedule with _id:", _id);
        try {
            // Ensure the ID is a valid ObjectId before attempting deletion
            if (!ObjectId.isValid(_id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const result = await Schedule.deleteOne({ _id: new ObjectId(_id) });

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Schedule not found' });
            }

            res.status(200).json({ message: 'Schedule deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

app.get('/availability/:userId', async (req, res) => {
    
})



    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });