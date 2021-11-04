const jwt = require('jsonwebtoken');

const checkUser = (token) => {
  if (token) {
    const decodedUser = jwt.decode(token);
    const id = decodedUser.user;
    return id;
  }
  return null;
};

module.exports = checkUser;
