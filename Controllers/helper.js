const response = (res, message, data = '') => {
  return res.json({
    message: message,
    data: data
  });
}

module.exports = response;
