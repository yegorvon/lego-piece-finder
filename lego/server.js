const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500;


app.use(express.static('public'));


app.get('/lego-set/:number', (req, res) => {
    const setNumber = req.params.number;
    const filePath = path.join(__dirname, 'lego_sets.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }

        const legoSets = JSON.parse(data);
        const set = legoSets.find(s => s.set_number === setNumber);

        if (set) {
            res.json(set);
        } else {
            res.status(404).send('Set not found');
        }
    });
});

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
