require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/vehicles', require("./routes/vehicles.js"));
app.use('/vehicleTypes', require("./routes/vehicleTypes.js"));
app.use('/bookings', require("./routes/bookings.js"));

app.listen(PORT,()=> console.log("Server running on port " + PORT))
