const express = require('express');
const AuthApis = require('./authApis');
const router = express.Router();

router.get('/checkRoutes', async (req, res) => {
    res.status(200).json({ message: 'i am fine!' })
});

router.use('/auth', AuthApis);


module.exports = router;
