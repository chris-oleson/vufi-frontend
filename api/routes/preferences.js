const { Router } = require('express')
const router = Router()
const db = require('../database')

router.get('/:id', (req, res) => {
    db.query(`SELECT * FROM user_prefs WHERE id = ${req.params.id}`, (err, results) => {
        if (results) {
            res.send(results[0])
        }
        else {
            res.sendStatus(404)
        }
    })
})

router.put('/:id', (req, res) => {
    db.query(`UPDATE user_prefs SET theme = ${req.body.theme}, currency = '${req.body.currency}' WHERE id = ${req.params.id}`, (err, results) => {
        if (results) {
            res.sendStatus(200)
        }
        else {
            res.sendStatus(404)
        }
    })
})

module.exports = router