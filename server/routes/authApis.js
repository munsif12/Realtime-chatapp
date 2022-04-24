// create chat get apis with express
const express = require('express');

const {
    login,
    register,
    checkToken
} = require('../controllers/auth');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/checkToken', checkToken);
module.exports = router;