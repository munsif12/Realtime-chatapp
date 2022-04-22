const express = require('express');
const AuthApis = require('./authApis');
const UsersApis = require('./getUsers');
const ChatAndGroupApis = require('./chatAndGroupApis');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/checkRoutes', async (req, res) => {
    res.status(200).json({ message: 'i am fine!' })
});

router.use('/auth', AuthApis);
router.use('/user', authMiddleware, UsersApis);
router.use('/chat', authMiddleware, ChatAndGroupApis);

module.exports = router;
