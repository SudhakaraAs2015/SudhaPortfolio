const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
const connection = mongoose.connection;
connection.on('connected',()=>{
    console.log("Sudha's DB is Connected" , );
    
});

connection.on('Error',(err)=>{
    console.log("Error Connecting Sudha's DB :", err);
    
});
connection.on('disconnected', () => {
    console.log("Sudha's DB Disconnected");
});

module.exports = mongoose;