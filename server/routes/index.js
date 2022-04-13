const express = require('express');
const ChatApis = require('./chatApis');
const router = express.Router();

router.get('/checkRoutes', async (req, res) => {
    res.status(200).json({ message: 'i am fine!' })
});


router.use('/chat', ChatApis);


module.exports = router;
