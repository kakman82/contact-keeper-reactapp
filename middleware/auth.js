const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.headers['x-auth-token'] || req.headers['authorization'];

  // Check if not token
  if (!token) {
    return res
      .status(400)
      .json({ msg: 'No token provided, authorization denied' });
  }
  // If there is token
  try {
    const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
    // buradaki user register ve login sırasında oluşturulan token içindeki user.id aslında
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid!' });
  }
};
