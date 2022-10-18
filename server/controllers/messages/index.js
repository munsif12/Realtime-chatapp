const sendMessage = require('./sendMessage');
const getAllChatMessages = require('./getAllChatMessages');
const getAllStarredMessages = require('./getStarMessages');
const starMessage = require('./starMessage');
const unstarMessage = require('./unstarMessage');
module.exports = { sendMessage, getAllChatMessages, getAllStarredMessages, starMessage, unstarMessage }