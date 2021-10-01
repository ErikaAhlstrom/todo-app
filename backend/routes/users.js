const express = require('express');
const router = express.Router();
let User = require('../models/user.model')
/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('Hey from Users Router');
}); */


// Get all users
router.route('/')
  .get((req, res, next) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err))
  })

// Add a user
router.route('/add')
  .post((req, res, next) => {
   
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password
    });
    
   

    newUser.save()
      .then(() => res.json('New user added!'))
      .catch(err => res.status(400).json('Error: ' + err)); 

  })
module.exports = router;
