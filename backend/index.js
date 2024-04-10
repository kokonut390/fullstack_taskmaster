const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

const password = process.argv[2]

const url = `mongodb+srv://comp227:${password}@cluster0.rt7kzix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Meme Schema
const schduleSchema = new mongoose.Schema({
    id: String,
    name: String,
    blank: String,
    source: String
});

const Schdule = mongoose.model('Schdule', schduleSchemaSchema);

app.use(bodyParser.json());

// Routes
app.get('/memes', async (req, res) => {
    try {
        const memes = await Meme.find();
        res.json(memes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/memes', async (req, res) => {
    const { id, name, blank, source } = req.body;
    try {
        const newMeme = new Meme({ id, name, blank, source });
        await newMeme.save();
        res.status(201).json(newMeme);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
