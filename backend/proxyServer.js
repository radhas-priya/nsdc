const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());

// Proxy route for fetching CSRF token
app.get('/api/get-csrf-token', async (req, res) => {
    try {
        const response = await axios.head('https://uatservices.ekaushal.com/api/get-csrf-token', {
            withCredentials: true,
        });
        res.status(response.status).json(response.headers);
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        res.status(error.response ? error.response.status : 500).json({ message: 'Error fetching CSRF token' });
    }
});

app.listen(5000, () => {
    console.log('Proxy server running on http://localhost:5000');
});
