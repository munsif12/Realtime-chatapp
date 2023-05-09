// create a express server
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');
const connectToDatabase = require('./config/connDb');
const morgan = require('morgan');

let PORT = process.env.PORT;
// import compression from "compression";


//logger
app.use(morgan(':method :url :status - :response-time ms - :res[content-length]'))
//middlewares
app.use(cors())
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Realtime-Chatapp!');
});

app.use('/api', routes);

//connect to Database

// create a server
app.listen(PORT, () => {
    console.log(`🔥 Success: Server is running on port ${PORT}.`);
    connectToDatabase();
});