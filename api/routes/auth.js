const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const db = require('../database')

router.post('/login', (req, res) => {
    let match = false
    db.query('SELECT * FROM users', (err, results) => {
        let users = results
        for (let i=0; i < users.length; i++) {
            if (users[i].email === req.body.email) {
                if (bcrypt.compare(req.body.password, users[i].password)) {
                    match = true
                    res.send(users[i].id.toString())
                }
            }
        }
        if (!match) {
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
            
            // Add user data to table
            db.query(`INSERT INTO users VALUES (null, '${req.body.email}', '${encryptedPassword}', '${req.body.firstName}', '${req.body.lastName}')`,
                (err, results) => {
                    res.send(results.insertId.toString())
                }
            )
        }
    })
})


module.exports = router