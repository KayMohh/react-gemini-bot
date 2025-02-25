// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build'))); // Serve static files from 'build' directory

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html')); // Serve index.html
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));