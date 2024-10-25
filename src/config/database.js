require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'devTinderApp',  
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);  
  }
};

module.exports = connectDB;
