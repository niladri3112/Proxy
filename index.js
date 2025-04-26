const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 8000;

// Allow CORS for all origins
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Create a simple proxy route
app.get('/proxy', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('URL query parameter is required');
    }

    try {
        const response = await fetch(url);
        const data = await response.text(); // or use response.json() depending on your API
        res.send(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data from the requested URL');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`CORS Proxy Server running at http://localhost:${port}`);
});
