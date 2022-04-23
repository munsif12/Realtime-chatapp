const expres = require('express');
const { createChat, getChats, createGropuChat, renameGroupChat, removeFromGroupChat, addToGroupChat, getGroupChats } = require('../controllers/chat');
const authMiddleware = require('../middlewares/authMiddleware');
const router = expres.Router();

// /api/chats
router.route('/')
    .post(authMiddleware, createChat)
    .get(authMiddleware, getChats);
// router.route('/:chatId/messages').get(authMiddleware, getChatMessages).post(authMiddleware, createChatMessage);
// router.route('/:chatId/messages/:messageId').delete(authMiddleware, deleteChatMessage).put(authMiddleware, updateChatMessage);

// routes for groups
router.route('/group')
    .post(authMiddleware, createGropuChat)
    .get(authMiddleware, getGroupChats)

router.route('/rename-groupchat')
    .put(authMiddleware, renameGroupChat);

router.route('/remove-from-groupchat')
    .put(authMiddleware, removeFromGroupChat);

router.route('/add-to-groupchat')
    .post(authMiddleware, addToGroupChat);
// router.route("/group/:id").delete(authMiddleware,deleteGroupChat)
module.exports = router;