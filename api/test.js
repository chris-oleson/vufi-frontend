const express = require('express');
const app = express();

app.get('/api/test', (req, res) => {
  res.status(200).send('Test endpoint');
});

module.exports = app;