const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const checkUser = (token) => {
  console.log('Check user function');
  if (token) {
    console.log("Token", token)
    const decodedUser = jwt.decode(token)
    const id = decodedUser.user
    return id;
  
  } else {
    console.log('fel!');  
    return null;
  }
};

module.exports = checkUser;