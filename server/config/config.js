require('dotenv').config();

const config = {
  port: 5000,
  dbUrlMongoDB: process.env.MONGO_URI,
  API_KEY_JWT: process.env.API_KEY_JWT,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
};

module.exports = config;
