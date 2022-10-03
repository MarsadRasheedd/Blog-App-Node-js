const mongoose = require('mongoose');
const Schema = mongoose.Schema

const user_schema = new Schema({
  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    validate: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  },

  avatar: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  }
},{timestamps: true});

const User = mongoose.model('User', user_schema);
module.exports = User;
