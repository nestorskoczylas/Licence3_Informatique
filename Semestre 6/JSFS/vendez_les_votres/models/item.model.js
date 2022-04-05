const mongoose = require('mongoose');

const DEFAULT_IMAGE = '/images/noimage.jpg';

/*
 * setter for image field in itemSchema, used to set a default value to image field if image is not defined
 * @param image (string) the provided image field
 * @return (string) the image value
*/
const setDefaultImage =
  image => (image === undefined || image === '') ? DEFAULT_IMAGE : image;

const itemSchema = new mongoose.Schema({
    title :  {
              type : String,
              required : true
            },
    soldBy :  {
                type : String,
                required : true
              },
    price : {
              type : Number,
              required : true
            },
    image : {
              type : String,
              set : setDefaultImage
            }
});

module.exports = itemSchema;

const dbConnection = require('../controllers/db.controller');
const Item = dbConnection.model('Item',itemSchema,'items');

module.exports.model = Item;
