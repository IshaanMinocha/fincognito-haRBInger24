require('dotenv').config();

const config = {
  port: 5000,
  dbUrlMongoDB: process.env.MONGO_URI,
  API_KEY_JWT: process.env.API_KEY_JWT,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
  ZKP_SECRET_KEY: process.env.ZKP_SECRET_KEY,
};

module.exports = config;
