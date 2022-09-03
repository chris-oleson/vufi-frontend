const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const db = require('../database')

router.patch('/:id/update/password', (req, res) => {
    // Search for user making request
    db.query(`SELECT * FROM users WHERE id = '${req.params.id}'`, (err, results) => {
        // Check if old password matches
        bcrypt.compare(req.body.oldPassword, results[0].password, (err, match) => {
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

router.put('/:id/update/preferences', (req, res) => {
    db.query(`UPDATE user_prefs SET theme = ${req.body.theme}, currency = '${req.body.currency}' WHERE id = ${req.params.id}`, (err, results) => {
        res.sendStatus(200)
    })
})

router.get('/:id/preferences', (req, res) => {
    db.query(`SELECT * FROM user_prefs WHERE id = ${req.params.id}`, (err, results) => {
        res.send(results[0])
    })
})

module.exports = router