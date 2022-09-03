const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const db = require('../database')

router.post('/login', (req, res) => {
    // Search for matching email
    db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, (err, results) => {
        if (results.length) {
            // Check if password matches
            bcrypt.compare(req.body.password, results[0].password, (err, match) => {
                if (match) {
                    res.send(results[0].id.toString())
                }
                else {
                    res.sendStatus(404)
                }
            })
        }
        else {
            res.sendStatus(404)
        }
    })
})

router.post('/create', (req, res) => {
    // Check if there is a matching existing email
    db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, (err, results) => {
        if (results.length) {
            res.sendStatus(409)
        }
        else {
            // Encrypt new password
            let salt = bcrypt.genSaltSync(10)
            let encryptedPassword = bcrypt.hashSync(req.body.password, salt)
            
            // Add user data
            db.query(`INSERT INTO users VALUES (null, '${req.body.email}', '${encryptedPassword}', '${req.body.firstName}', '${req.body.lastName}')`,
                (err, results) => {
                    res.send(results.insertId.toString())

                    // Add default user prefs
                    db.query(`INSERT INTO user_prefs VALUES (null, 0, 'USD', ${results.insertId})`)
                }
            )
        }
    })
})

module.exports = router