const express = require('express');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Define routes
app.use('/api/v1', eventRoutes);
app.get('/api/v1/', (req, res) => {
    res.send('Hello World');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));