// create a express server
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');

let PORT = process.env.PORT;

//middlewares
app.use(cors())

// create a route
app.get('/', (req, res) => {
    res.send('Welcome to chat app!');
});

app.use('/api', routes);



// create a server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🔥`);
});