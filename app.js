const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const blogRoute = require('./Routes/blog');
const commentsRoute = require('./Routes/comment');
const userRoute = require('./Routes/user');

mongoose.connect('mongodb://localhost:27017/blogdb', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (error) => {
  console.log(error);
});


db.on('open', () => {
  console.log("database connection is established.");
});

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
})

app.use('/api/blog', blogRoute);
app.use('/api/blog', commentsRoute);
app.use('/api', userRoute);
