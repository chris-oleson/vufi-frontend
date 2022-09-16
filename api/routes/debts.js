const { Router } = require('express')
const router = Router()
const db = require('../database')

router.get('/:user_id', (req, res) => {
    db.query(`SELECT * FROM assets WHERE user_id = ${req.params.user_id} AND value < 0`, (err, results) => {
        if (results) {
            res.send(results)
        }
        else {
            res.sendStatus(404)
        }
    })
})

router.post('/', (req, res) => {
    db.query(`INSERT INTO assets VALUES (null, '${req.body.name}', '${req.body.type}', ${req.body.value}, ${req.body.user_id})`, (err, results) => {
        db.query(`INSERT INTO asset_history VALUES (null, '${req.body.value}', CURRENT_DATE(), ${results.insertId})`)
    })
})

router.put('/:id', (req, res) => {
    // Update the debt data
    db.query(`UPDATE assets SET name = '${req.body.name}', type = '${req.body.type}', value = ${req.body.value}, user_id = ${req.body.user_id} WHERE id = ${req.params.id}`)
    // Check if there is already current value data
    db.query(`SELECT * FROM asset_history WHERE asset_id = ${req.params.id} AND date = CURRENT_DATE()`, (err, results) => {
        // If there is, update the current value data
        if (results.length) {
            db.query(`UPDATE asset_history SET value = ${req.body.value} WHERE asset_id = ${req.params.id} AND date = CURRENT_DATE()`)
        }
        // If not, add new data for today
        else {
            db.query(`INSERT INTO asset_history VALUES (null, '${req.body.value}', CURRENT_DATE(), ${req.params.id})`)
        }
    })
})

router.delete('/:id', (req, res) => {
    db.query(`DELETE FROM assets WHERE id = ${req.params.id}`)
})

module.exports = router