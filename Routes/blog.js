const express = require('express');
const router = express.Router();

const BlogController = require('../Controllers/blog_controller');

router.post('/create', BlogController.create);
router.get('/', BlogController.index);
router.get('/show', BlogController.show);
router.get('/destroy', BlogController.destroy);
router.put('/update', BlogController.update);

module.exports = router
