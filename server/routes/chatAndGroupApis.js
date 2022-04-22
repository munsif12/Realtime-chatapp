const expres = require('express');
const { createChat, getChats } = require('../controllers/chat');
const authMiddleware = require('../middlewares/authMiddleware');
const router = expres.Router();



// routes for chats
router.route('/').post(authMiddleware, createChat).get(authMiddleware, getChats);
// router.route('/:chatId/messages').get(authMiddleware, getChatMessages).post(authMiddleware, createChatMessage);
// router.route('/:chatId/messages/:messageId').delete(authMiddleware, deleteChatMessage).put(authMiddleware, updateChatMessage);

// routes for groups
// router.route('/groups').get(authMiddleware, getChatGroups).post(authMiddleware, createChatGroup);
// router.route('/rename-group').put(authMiddleware, renameChatGroup);
// router.route('/remove-from-group').put(authMiddleware, removeFromChatGroup);
// router.route('/add-to-group').put(authMiddleware, addToChatGroup);
// router.route('/:chatId/groups/:groupId').delete(authMiddleware, deleteChatGroup).put(authMiddleware, updateChatGroup);
module.exports = router;