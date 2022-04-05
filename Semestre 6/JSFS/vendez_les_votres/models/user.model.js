const mongoose = require('mongoose');

// definition of schema
const userSchema = new mongoose.Schema({
    money : {
              type : Number,
              default : 200,
              required : true
            },
    login : {
              type : String,
              required : true,
              unique : true
            },
    password : {
                type : String,
                required : true
               }
});


module.exports = userSchema;

// model
const dbConnection = require('../controllers/db.controller');
const User = dbConnection.model('User',userSchema,'users');

module.exports.model = User;
