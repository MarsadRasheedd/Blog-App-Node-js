const path = require('path');
const multer = require('multer');

// files upload to storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

// upload function with file filter
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype == 'image/png' || file.mimetype == 'img/jpg') {
      cb(null, true);
    } else {
      console.log('only igp & png files are supported.');
      cb(null, false);
    }
  }
});


module.exports = upload;
