const express = require('express');

const {
    sendMessage,
    getAllChatMessages,
    getAllStarredMessages,
    starMessage
} = require('../controllers/messages');

const router = express.Router();

router.post('/', sendMessage);
router.get('/starred', getAllStarredMessages);
router.get('/:chatId', getAllChatMessages);
router.post('/star/:messageId', starMessage);
module.exports = router;