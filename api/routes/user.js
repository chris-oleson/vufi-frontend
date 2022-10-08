const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const db = require('../database')

// Check if user is authenticated
router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        res.sendStatus(401)
    }
})

router.patch('/password', (req, res) => {
    // Search for user making request
    db.query(`SELECT * FROM users WHERE id = '${req.user.id}'`, (err, results) => {
        // Check if old password matches
        bcrypt.compare(req.body.password, results[0].password, (err, match) => {
            if (match) {
                // Encrypt new password
                let salt = bcrypt.genSaltSync(10)
                let encryptedPassword = bcrypt.hashSync(req.body.newPassword, salt)

                db.query(`UPDATE users SET \`password\` = '${encryptedPassword}' WHERE id = ${req.user.id}`)
                res.sendStatus(200)
            }
            else {
                res.sendStatus(404)
            }
        })
    })
})

router.patch('/email', (req, res) => {
    // Search for user making request
    db.query(`SELECT * FROM users WHERE id = '${req.user.id}'`, (err, results) => {
        // Check if password matches
        bcrypt.compare(req.body.password, results[0].password, (err, match) => {
            if (match) {
                db.query(`UPDATE users SET email = '${req.body.email}' WHERE id = ${req.user.id}`)
                res.sendStatus(200)
            }
            else {
                res.sendStatus(404)
            }
        })
    })
})

router.delete('/', (req, res) => {
    // Search for user making request
    db.query(`SELECT * FROM users WHERE id = '${req.user.id}'`, (err, results) => {
        // Check if password matches
        bcrypt.compare(req.query.password, results[0].password, (err, match) => {
            if (match) {
                db.query(`DELETE FROM users WHERE id = ${req.user.id}`, (err, results) => {
                    if (results) {
                        res.sendStatus(200)
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
})

module.exports = router