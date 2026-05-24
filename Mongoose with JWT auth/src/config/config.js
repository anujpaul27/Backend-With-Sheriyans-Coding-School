const dotenv = require("dotenv");
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in your env file.");
}

if (!process.env.JWT_SECRET)
{
  throw new Error ('JWT secret not define your env file.')
}

const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET : process.env.JWT_SECRET,
};


module.exports = config; 
