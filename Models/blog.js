const mongoose = require('mongoose');
const Schema = mongoose.Schema

const { Comment } = require(__dirname + '/comment.js').schema;
const paginate = require('mongoose-paginate-v2');

const blogSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  content: {
    type: String
  },
  comments: {
    type: [Comment]
  },
}, { timestamps: true })

blogSchema.plugin(paginate);
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
