const express = require('express');
const app = express();

app.get('/api/hello/:id', (req, res) => {
    res.status(200).send(req.params.id)
})

app.get('/api/hello', (req, res) => {
    res.status(200).send('Hello world!')
})

module.exports = app;