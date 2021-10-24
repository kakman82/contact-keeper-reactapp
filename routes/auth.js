const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// @route:  GET api/auth
// @dec:    Get logged in user
// @access: Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error!');
  }
});

// @route:  POST api/auth
// @dec:    Auth user & get token
// @access: Public
router.post(
  '/',
  body('email', 'Please include a valid email!').isEmail(),
  body('password', 'Password is required!').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      //! bu şekilde jwt den dönecek olan veriyi tanımlamış olduk, user yerine yalnızca db deki id si dönmüş olacak - aşağıdaki token içinde
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
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
      res.status(500).send('Server Error!');
    }
  }
);

module.exports = router;
