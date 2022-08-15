// create chat get apis with express
const express = require('express');

const {
    users,
    updateUser
} = require('../controllers/users');

const router = express.Router();
router.route('/')
    .get(users)
    .put(updateUser);
module.exports = router;