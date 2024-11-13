const express = require('express')
require('dotenv').config();
// const cors = require('cors');
const dbConfig = require('./config/dbConfig')
const app = express();
const portFolioRoutes = require('./routes/portFolioRoutes')
app.use(express.json());
app.use('/api/sudhaportfolio',portFolioRoutes)
const port = process.env.PORT || 8000

// Heroku
// const path =  require("path");
// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname,'frontend/build')));
//     app.get("*",(req,res)=>{
//         res.sendFile(path.join(__dirname,"frontend/build/index.html"));

//     });
// }

//Vercel
// app.use(cors(
//     {
//         origin:["https://sudha-portfolio-five.vercel.app/"],
//         methods: ["POST","PUT","DELETE","GET"],
//         credentials:true
//     }
// ))
app.listen(port,()=>{
    console.log("Sudha's server is running on the port 8000");
    
});