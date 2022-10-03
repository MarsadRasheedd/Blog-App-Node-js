const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/user_controller');
const upload = require('../middleware/upload');
const authenticate = require('../middleware/authenticate');

router.post('/user/register', upload.single('avatar'), UserController.create);
router.post('/user/login', UserController.login);
router.get('/users', authenticate, UserController.index);

module.exports = router;
