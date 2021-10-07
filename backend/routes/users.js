const express = require('express');
const router = express.Router();
let User = require('../models/user.model')
const bcrypt = require('bcryptjs');


// Get all users
router.route('/')
  .get((req, res, next) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err))
  })
// Create a user
  .post( async (req, res, next) => {
    try {
      const {firstName, lastName, email, password } = req.body

      if(!email || !password) {
        return res.status(400).json({errorMessage: "Please fill in all required fields"})
      }

      if(password.length < 6) {
        return res.status(400).json({errorMessage: "Please enter a password with at least 6 characters."})
      }

      const existingUser = await User.findOne({email})
      if(existingUser) {
        return res.status(400).json({
          errorMessage: "This email already exists"
        })
      }

      // Hash the password

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt)

      // Save user account to the db

      const newUser = new User({
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": passwordHash
      })

      const savedUser = await newUser.save();
      console.log(newUser)

      // log the user in

      

    } catch (err) {
      console.error(err);
      res.status(500).send();
    }

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
  

module.exports = router;
