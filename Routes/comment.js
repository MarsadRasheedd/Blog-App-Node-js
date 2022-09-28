const express = require('express');
const router = express.Router();
const CommentsController = require('../Controllers/comment_controller');

router.post('/:id/comments/create', CommentsController.create);
router.get('/:id/comments', CommentsController.index);
router.delete('/:id/comments/destroy', CommentsController.destroy);

module.exports = router
