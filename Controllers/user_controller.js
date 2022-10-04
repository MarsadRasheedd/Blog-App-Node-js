const User = require('../Models/user');
const response = require('./helper');
const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// create user
const create = (req, res, next) => {
  bcryt.hash(req.body.password, 10, function (error, hashedPassword) {
    if (error) {
      response(res, error.message);
    }

  let user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashedPassword
  });

  if (req.file) {
    user.avatar = req.file.path
  }

    user.save()
      .then(r => {
        response(res, "User created successfully.");
      })
    .catch(error => {
      response(res, "An error occurred.");
    })
  })
}

// login user
const login = (req, res, next) => {
  User.findOne({ $or: [{ email: req.body.email }, { password: req.body.password }] })
    .then(user => {
      if (user) {
        bcryt.compare(req.body.password, user.password, function (error, result) {
          if (error) {
            response(res, error.message);
          }

          if (result) {
            let token = jwt.sign({name: user.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN});
            res.status(200).json({
              message: "User logged in successfully.",
              token
            });

          } else {
              response(res, "Password doesn't match.");
          }
        });
      } else {
          response(res, "No user match. Please check your email.");
      }
    })
    .catch(error => {
      response(res, "An error occurred.");
    })
}

// display all users.
const index = (req, res, next) => {
  User.find({})
    .then(r => {
      response(res, "All users", r);
    })
    .catch(error => {
      response(res, "An error occurred.");
    });
}

module.exports = { create, index, login };
