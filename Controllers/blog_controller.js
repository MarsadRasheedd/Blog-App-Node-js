const Blog = require('../Models/blog');

// create blog
const create = (req, res) => {
  let blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content
  });

  blog.save()
    .then(response => {
      res.json({
        message: 'Blog uploaded successfully.',
      })
  }).catch(error => {
      res.json({
        message: 'An error occured.',
      });
    })
}

// show all blogs
const index = (req, res) => {
  Blog.find({})
    .then(response => {
      res.json({
        date: response,
        message: "All blogs"
      })
    })
    .catch(error => {
      res.json({
        message: 'An error occurred.'
      })
  })
}

// show a blog
const show = (req, res) => {
  let blogId = req.body.id
  Blog.findById(blogId)
    .then(response => {
      res.json({
        data: response
      });
    })
    .catch(error => {
      res.json({
      message: 'An error occured.'
    })
  })
}

// delete a blog
const destroy = (req, res) => {
  let blogId = req.body.id;
  Blog.findOneAndRemove({ _id: blogId })
    .then(response => {
      res.json({
        message: "Blog deleted successfully."
      });
    })
    .catch(error => {
      res.json({
        message: "An error occured."
      });
    })
}

// update a blog
const update = (req, res) => {
  let blog_id = req.body.id

  const updated_blog = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content
  }

  Blog.findByIdAndUpdate(blog_id, {$set: updated_blog })
    .then(response => {
      res.json({
        message: "Blog updated successfully."
      });
    })
    .catch(error => {
      res.json({
        message: "An error occured."
      });
    })
}


module.exports = {create, index, show, destroy, update };

