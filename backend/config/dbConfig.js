const mongoose = require('mongoose');

// Connection retry options
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Time to select a server (5 seconds)
      socketTimeoutMS: 45000, // Timeout for socket inactivity (45 seconds)
      reconnectTries: 5, // Number of retry attempts if connection fails
      reconnectInterval: 3000, // Wait time between retries (3 seconds)
    });

    console.log("Sudha's DB is Connected");
  } catch (err) {
    console.error("Error connecting to Sudha's DB:", err);
    // Optionally retry after some time (instead of crashing the app)
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
};

// Start initial connection attempt
connectDB(); 

// MongoDB connection object for additional event handling
const connection = mongoose.connection;

// Handle disconnections and attempt reconnect
connection.on('disconnected', () => {
  console.log("Sudha's DB Disconnected");
  setTimeout(connectDB, 5000); // Retry after 5 seconds
});

// Handle errors during the connection
connection.on('error', (err) => {
  console.error("MongoDB connection error:", err);
});

// Graceful exit logic when the app terminates
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed due to app termination.");
    process.exit(0); // Graceful exit
  });
});

module.exports = mongoose;
