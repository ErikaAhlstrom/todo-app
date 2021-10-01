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

// Get one user
router.route('/:id')
  .get((req, res, next) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err))
  })

// Add a user
router.route('/add')
  .post((req, res, next) => {

    const newUser = new User({
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "email": req.body.email,
      "password": req.body.password
    });

    newUser.save()
      .then(() => res.json('New user added!'))
      .catch(err => res.status(400).json('Error: ' + err)); 
  })

module.exports = router;
