const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected..");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = ConnectDB;
