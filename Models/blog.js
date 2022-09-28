const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Comment = require('./comment');
 const {CharacterSchema} = require(__dirname +'/comment.js').schema;

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
    type: [CharacterSchema]
  },
}, {timestamps: true})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
