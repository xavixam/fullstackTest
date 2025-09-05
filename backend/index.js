require('dotenv').config();
const express = require('express');
const db = require('./models');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/vehicles', require("./routes/vehicles.js"));
app.use('/vehicleTypes', require("./routes/vehicleTypes.js"));

app.listen(PORT,()=> console.log("Server running on port " + PORT))
