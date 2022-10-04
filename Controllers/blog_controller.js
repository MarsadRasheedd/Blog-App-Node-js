const Blog = require('../Models/blog');
const response = require('./helper');
// create blog
const create = (req, res) => {
  let blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content
  });

  blog.save()
    .then(r => {
      response(res, "Blog uploaded successfully.");
  }).catch(error => {
      response(res, "An error occured.");
    })
}

// show all blogs
const index = (req, res) => {
  if (req.query.page && req.query.limit) {
    Blog.paginate({}, { page: req.query.page, limit: req.query.limit })
      .then(r => {
        response(res, "Paginated Blogs", r);
      })
      .catch(error => {
        response(res, "An error occured.");
      })
  } else {
    Blog.find({})
      .then(r => {
        response(res, "All blogs", r);
      })
      .catch(error => {
        response(res, "An error occured.");
      })
  }
}

// show a blog
const show = (req, res) => {
  let blogId = req.body.id
  Blog.findById(blogId)
    .then(r => {
      response(res, "Blog", r);
    })
    .catch(error => {
      response(res, "An error occured.");
  })
}

// delete a blog
const destroy = (req, res) => {
  let blogId = req.body.id;
  Blog.findOneAndRemove({ _id: blogId })
    .then(r => {
      response(res, "Blog deleted successfully.");
    })
    .catch(error => {
      response(res, "An error occured.");
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
    .then(r => {
      response(res, "Blog updated successfully.");
    })
    .catch(error => {
      response(res, "An error occured.");
    })
}

module.exports = {create, index, show, destroy, update };

