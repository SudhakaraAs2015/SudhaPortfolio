const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { 
      serverSelectionTimeoutMS: 5000, // 5 seconds to select a server
      socketTimeoutMS: 45000, // 45 seconds for socket inactivity
    });
    console.log("Sudha's DB is Connected");
  } catch (err) {
    console.error("Error connecting to Sudha's DB:", err);
    process.exit(1); // Exit the app if the DB connection fails
  }
};

connectDB(); // Call the function to connect

const connection = mongoose.connection;

connection.on('disconnected', () => {
  console.log("Sudha's DB Disconnected");
  setTimeout(connectDB, 5000); // Retry connection after 5 seconds
});

module.exports = mongoose;
