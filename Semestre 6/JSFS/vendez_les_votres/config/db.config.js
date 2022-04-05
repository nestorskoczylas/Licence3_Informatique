const DB_HOST = 'localhost';
const DB_PORT = 27017;
const DB_NAME = 'lbc';
const DB_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

module.exports = {
  DB_HOST : DB_HOST,
  DB_PORT : DB_PORT,
  DB_NAME : DB_NAME,
  DB_URI : DB_URI
}
