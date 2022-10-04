const Comment = require('../Models/comment');
const Blog = require('../Models/blog');
const response = require('./helper');

// add a comment to blog
const create = (req, res) => {

  let comment = new Comment({
    content: req.body.comment,
  })

  Blog.findByIdAndUpdate(req.params.id,
    {$push: {comments: comment }}
    )
    .then(response => {
      response(res, "Comment added successfully.");
    })
    .catch(error => {
      response(res, "An error occured.");
    })
}

// list all comments in a blog
const index = (req, res) => {
  Blog.findById(req.params.id, 'comments')
    .then(r => {
      response(res, "Blog comments", r);
    })
    .catch(error => {
      response(res, "An error occured.");
    })
}

// delete comment from blog
const destroy = (req, res) => {

  Blog.findByIdAndUpdate(req.params.id, { $pull: { comments: {'content': req.body.comment} } })
    .then(response => {
      response(res, "Comment deleted successfully.");
    })
    .catch(error => {
      response(res, "An error occured.");
    })
}

module.exports = {create, index, destroy}
