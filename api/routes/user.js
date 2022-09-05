const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const db = require('../database')

router.patch('/:id/password', (req, res) => {
    // Search for user making request
    db.query(`SELECT * FROM users WHERE id = '${req.params.id}'`, (err, results) => {
        // Check if old password matches
        bcrypt.compare(req.body.password, results[0].password, (err, match) => {
            if (match) {
                // Encrypt new password
                let salt = bcrypt.genSaltSync(10)
                let encryptedPassword = bcrypt.hashSync(req.body.newPassword, salt)

                db.query(`UPDATE users SET \`password\` = '${encryptedPassword}' WHERE id = ${req.params.id}`)
                res.sendStatus(200)
            }
            else {
                res.sendStatus(404)
            }
        })
    })
})

router.patch('/:id/email', (req, res) => {
    // Search for user making request
    db.query(`SELECT * FROM users WHERE id = '${req.params.id}'`, (err, results) => {
        // Check if password matches
        bcrypt.compare(req.body.password, results[0].password, (err, match) => {
            if (match) {
                db.query(`UPDATE users SET email = '${req.body.email}' WHERE id = ${req.params.id}`)
                res.sendStatus(200)
            }
            else {
                res.sendStatus(404)
            }
        })
    })
})

router.delete('/:id', (req, res) => {
    // Search for user making request
    db.query(`SELECT * FROM users WHERE id = '${req.params.id}'`, (err, results) => {
        // Check if password matches
        bcrypt.compare(req.query.password, results[0].password, (err, match) => {
            if (match) {
                db.query(`DELETE FROM users WHERE id = ${req.params.id}`, (err, results) => {
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