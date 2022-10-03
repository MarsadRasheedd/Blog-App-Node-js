const Comment = require('../Models/comment');
const Blog = require('../Models/blog');

// add a comment to blog
const create = (req, res) => {

  let comment = new Comment({
    content: req.body.comment,
  })

  Blog.findByIdAndUpdate(req.params.id,
    {$push: {comments: comment }}
    )
    .then(response => {
      res.json({
        message: "Comment added successfully!!"
      })
    })
    .catch(error => {
      res.json({
        message: "An error occurred.."
      })
    })
}

// list all comments in a blog
const index = (req, res) => {
  Blog.findById(req.params.id, 'comments')
    .then(response => {
      res.json({
        data: response
      });
    })
    .catch(error => {
      res.json(
        error.message
      )
    })
}

// delete comment from blog
const destroy = (req, res) => {

  Blog.findByIdAndUpdate(req.params.id, { $pull: { comments: {'content': req.body.comment} } })
    .then(response => {
      res.json({
        message: "Comment deleted successfully."
      })
    })
    .catch(error => {
      res.json({
        message: "An error occurred."
      })
    })
}


module.exports = {create, index, destroy}
