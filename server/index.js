// create a express server
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');
const connectToDatabase = require('./config/connDb');

let PORT = process.env.PORT;

//middlewares
app.use(cors())
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Realtime-Chatapp!');
});

app.use('/api', routes);

//connect to Database
connectToDatabase();

// create a server
app.listen(PORT, () => {
    console.log(`🔥 Success: Server is running on port ${PORT}.`);
});