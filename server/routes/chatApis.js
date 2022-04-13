// create chat get apis with express
const express = require('express');

const {
    getAllChats,
    getChat
} = require('../controllers/chats');

const router = express.Router();

router.get('/all', getAllChats);
router.get('/:id', getChat);

module.exports = router;