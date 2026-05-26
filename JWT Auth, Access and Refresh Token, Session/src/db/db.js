const mongoose = require("mongoose");
const config = require("../config/config");

const ConnectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("Database connected...");
  } catch (err) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Stop the app if it can't connect
  }
};

module.exports = ConnectDB;
