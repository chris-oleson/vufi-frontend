const express = require('express');
const app = express();
const mysql = require('mysql2')
const db = mysql.createConnection(process.env.DATABASE_URL)

app.get('/api/users', (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        res.status(200).send(results)
        connection.end()
    })
})

module.exports = app;