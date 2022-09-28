const mongoose = require('mongoose');
const Schema = mongoose.Schema

const comment_schema = new Schema({
  content: {
    type: String,
  },
}, { timestamps: true })

const Comment = mongoose.model('Comment', comment_schema);
module.exports = Comment;
