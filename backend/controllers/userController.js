const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const checkUser = require('../utils/checkUser');
const { checkEmptyFieldsRegister, checkEmptyFieldsLogin, checkPasswordLength } = require('../utils/validationUser');

exports.registerUser = async (req, res) => {
  try {
    const {
      firstName, lastName, email, password,
    } = req.body;

    if (!checkEmptyFieldsRegister(email, password, firstName, lastName)) {
      return res
        .status(400)
        .json({ errorMessage: 'Please fill in all required fields' });
    }

    if (!checkPasswordLength(password)) {
      return res.status(400).json({ errorMessage: 'Please enter a password with at least 6 characters.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        errorMessage: 'This email already exists',
      });
    }

    // Hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Save user account to the db

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    // sign the token

    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET,
    );

    // send the token in a HTTP only cookie
    return res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validations
    if (!checkEmptyFieldsLogin(email, password)) {
      return res
        .status(400)
        .json({ errorMessage: 'Please fill in all required fields' });
    }

    const existingUser = await User.findOne({ email });
    console.log(existingUser.email);

    if (!existingUser) {
      return res
        .status(401)
        .json({ errorMessage: 'Wrong email or password.' });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ errorMessage: 'Wrong email or password.' });
    }

    // sign the token
    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET,
    );

    console.log(token);

    // send the token in a HTTP only cookie
    return res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.logoutUser = async (req, res) => res.cookie('token', '', {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  expires: new Date(0),
})
  .send();

exports.checkIfLoggedIn = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.json(false);
    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);
  } catch (err) {
    console.log(err);
    res.json(false);
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const userId = checkUser(req.cookies.token);
    const user = await User.findById(userId);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
