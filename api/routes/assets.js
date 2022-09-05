const { Router } = require('express')
const router = Router()
const db = require('../database')

router.get('/:user_id', (req, res) => {
    db.query(`SELECT * FROM assets WHERE user_id = ${req.params.user_id}`, (err, results) => {
        if (results) {
            res.send(results)
        }
        else {
            res.sendStatus(404)
        }
    })
})

router.post('/', (req, res) => {
    db.query(`INSERT INTO assets VALUES (null, '${req.body.name}', '${req.body.type}', ${req.body.value}, ${req.body.user_id})`)
})

router.put('/:id', (req, res) => {
    db.query(`UPDATE assets SET name = '${req.body.name}', type = '${req.body.type}', value = ${req.body.value}, user_id = ${req.body.user_id} WHERE id = ${req.params.id}`)
})

module.exports = router