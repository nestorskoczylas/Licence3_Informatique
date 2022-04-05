const User = require('../models/user.model').model;

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const validToken = (req, res , next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, jwtConfig.SECRET_TOKEN);
    req.userId = decoded.id;   // add user id to request : retrieved from token since added to payload
    console.log(`decoded req.userId: ${req.userId}`);
    next();
  }
  catch (err) {
    console.log(`erreur JWT : ${err.message}`);
    if (req.headers['sec-fetch-dest'] === 'empty') { // req comes from a fetch() ?
      console.log('sec-fetch-dest: EMPTY');
      res.status(401).json({ redirectTo : '/access/login'});
    } else {
      console.log(`sec-fetch-dest: ${req.headers['sec-fetch-dest'].toUpperCase()}`);
      res.status(301).redirect('/access/login');
    }
  }
}

module.exports.validToken = validToken;