const express = require('express');
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const app = express();
const cors = require('cors');
const portFolioRoutes = require('./routes/portFolioRoutes');


app.use(express.json());

app.use(cors())

app.get('/', (req, res) => {
  res.send("Welcome to Sudha's Portfolio API!");
});


app.use('/api/sudhaportfolio', portFolioRoutes);


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Sudha's server is running on port ${port}`);
});
