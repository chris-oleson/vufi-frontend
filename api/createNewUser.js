const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const mysql = require('mysql2')

mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// Create new user
router.post('/', (req, res) => {
    // Check if there is a matching existing email
    db.query("SELECT * FROM users WHERE email = ?", [req.body.email], (err, results) => {
        if (results.length) {
            res.sendStatus(409)
        }
        else {
            // Encrypt new password
            let salt = bcrypt.genSaltSync(10)
            let encryptedPassword = bcrypt.hashSync(req.body.password, salt)
            
            // Add user data
            db.query("INSERT INTO users VALUES (null, ?, ?, ?, ?)", [req.body.email, encryptedPassword, req.body.firstName, req.body.lastName], (err, results) => {
                    res.send(results.insertId.toString())

                    // Add default user prefs
                    db.query("INSERT INTO user_prefs VALUES (null, 0, 'USD', ?)", [results.insertId])
                }
            )
        }
    })
})