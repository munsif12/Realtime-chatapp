const createChat = require('./createChat.js');
const getChats = require('./getChats.js');
const createGropuChat = require('./createGroupChat.js');
const renameGroupChat = require('./renameGroupChat')
const removeFromGroupChat = require('./removeFromGroupChat')
const addToGroupChat = require('./addToGroupChat')
const getGroupChats = require('./getGroupChats')
module.exports = { createChat, getChats, createGropuChat, getGroupChats, renameGroupChat, removeFromGroupChat, addToGroupChat }