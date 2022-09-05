const { Router } = require('express')
const router = Router()
const db = require('../database')

router.get('/:user_id', (req, res) => {
    db.query(`SELECT * FROM debts WHERE user_id = ${req.params.user_id}`, (err, results) => {
        if (results) {
            res.send(results)
        }
        else {
            res.sendStatus(404)
        }
    })
})

router.post('/', (req, res) => {
    db.query(`INSERT INTO debts VALUES (null, '${req.body.name}', '${req.body.type}', ${req.body.value}, ${req.body.user_id})`)
})

module.exports = router