const User = require('../Models/user');
const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// create user
const create = (req, res, next) => {
  bcryt.hash(req.body.password, 10, function (error, hashedPassword) {
    if (error) {
      res.json({
        message: error
      })
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
      .then(response => {
        res.json({
          message: "User created successfully."
        })
      })
    .catch(error => {
      res.json({
        message: "An error occurred"
      });
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
            res.json({
              message: error
            });
          }

          if (result) {
            let token = jwt.sign({name: user.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN});
            res.status(200).json({
              message: "User logged in successfully.",
              token
            });
          } else {
            res.json({
              message: "Password doesn't match."
            });
          }
        });
      } else {
        res.json({
          message: "No user found. Please check your email or password"
        });
      }
    })
    .catch(error => {
      res.json({
        message: "An error occurred."
      });
    })
}

// display all users.
const index = (req, res, next) => {
  User.find({})
    .then(response => {
      res.json({
        message: response
      })
    })
    .catch(error => {
      res.json({
        message: "An error occurred."
      });
    });
}

module.exports = { create, index, login };
