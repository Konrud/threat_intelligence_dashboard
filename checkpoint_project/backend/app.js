const express = require('express');
const cors = require('cors');
const intelRoutes = require('./controllers/intelController');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/intel', intelRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

module.exports = app;
