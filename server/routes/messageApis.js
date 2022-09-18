const express = require('express');

const {
    sendMessage,
    getAllChatMessages,
    getAllStarredMessages
} = require('../controllers/messages');

const router = express.Router();

router.post('/', sendMessage);
router.get('/starred', getAllStarredMessages);
router.get('/:chatId', getAllChatMessages);
module.exports = router;