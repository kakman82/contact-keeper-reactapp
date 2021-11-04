const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// @route:  POST api/users
// @dec:    Register a user
// @access: Public
router.post(
  '/',
  body('name', 'Please add name!').not().isEmpty(),
  body('email', 'Please  include a valid email!').isEmail(),
  body(
    'password',
    'Please enter a password with 6 or more characters!'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      if (user) {
        res.status(400).json({ msg: 'User already exists!' });
      }

      user = new User({
        name: name,
        email: email,
        password: password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // Save user to the DB
      await user.save();

      //! bu şekilde jwt den dönecek olan veriyi tanımlamış olduk, user yerine yalnızca db deki id si dönmüş olacak - aşağıdaki token içinde
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.REACT_APP_JWT_SECRET,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: 'Server Error!' });
    }
  }
);

module.exports = router;
