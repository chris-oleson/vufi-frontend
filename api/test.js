const express = require('express');
const app = express();
const mysql = require('mysql2')

mysql.createConnection({
    host: process.env.PLANETSCALE_DB_HOST,
    user: process.env.PLANETSCALE_DB_USERNAME,
    password: process.env.PLANETSCALE_DB_PASSWORD,
    database: process.env.PLANETSCALE_DB
})

app.get('/api/users', (req, res) => {
    db.query("SELECT * FROM users WHERE email = ?", [req.body.email], (err, results) => {
        res.status(200).send(results)
    })
})

module.exports = app;