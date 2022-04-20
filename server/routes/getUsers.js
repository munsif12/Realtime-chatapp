// create chat get apis with express
const express = require('express');

const {
    users
} = require('../controllers/users');

const router = express.Router();

router.get('/', users);

module.exports = router;