const express = require('express');
const router = express.Router();
let User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


// Get all users
router.route('/')
  .get((req, res, next) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err))
  })
// Register a user
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

      // sign the token

      const token = jwt.sign(
        {
        user: savedUser._id
        }, 
      process.env.JWT_SECRET
      );

      console.log(token);

      // send the token in a HTTP only cookie
      // När cookien är set kommer den nu alltid skickas med till servern för att verifiera att personen är inloggad. Om jag fattat rätt?
      res
        .cookie("token", token, {
          httpOnly: true
        })
        .send();

    } catch (err) {
      console.error(err);
      res.status(500).send();
    }

  })

/* // Get one user
router.route('/:id')
  .get((req, res, next) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err))
  })
 */
// Log in a user

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

// Validations

    if(!email || !password) {
      return res
        .status(400)
        .json({errorMessage: "Please fill in all required fields"})
    }

    const existingUser = await User.findOne({email: email});
    console.log(existingUser.email)

    if(!existingUser) {
      return res
        .status(401)
        .json({errorMessage: "Wrong email or password."})
    }

      const passwordCorrect = await bcrypt.compare(
      password, 
      existingUser.password
    ); 

   if(!passwordCorrect) {
        return res
        .status(401)
        .json({errorMessage: "Wrong email or password."})
    } 

     // sign the token
     
      const token = jwt.sign(
        {
        user: existingUser._id
        }, 
      process.env.JWT_SECRET
      );

      console.log(token);

      // send the token in a HTTP only cookie

      res
        .cookie("token", token, {
          httpOnly: true
        })
        .send();


  } catch(err) {
    console.error(err);
    res.status(500).send();
  }
});


router.route('/logout')
  .get((req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
  .send();
  })

router.get("/loggedIn", (req, res) => {
   try {
        const token = req.cookies.token
        if(!token) return res.status(200).json(false)
        jwt.verify(token, process.env.JWT_SECRET);
        res.send(true);
    } catch (err){
        console.log(err);
        res.staus(200).json(false)
    }
})

module.exports = router;
