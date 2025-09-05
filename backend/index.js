require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql'
  }
);

app.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send('MySQL connection succesfull!');
  } catch (err) {
    res.status(500).send('Error connecting: ' + err);
  }
});

app.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});
