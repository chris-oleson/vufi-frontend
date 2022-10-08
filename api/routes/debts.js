const { Router } = require('express')
const router = Router()
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

router.get('/', (req, res) => {
    db.query(`SELECT * FROM assets WHERE user_id = ${req.user.id} AND is_debt = 1`, (err, results) => {
        res.send(results)
    })
})

router.get('/history', (req, res) => {
    db.query(`SELECT asset_history.\`value\`, asset_history.\`date\`, asset_id FROM asset_history, assets where asset_id = assets.id and user_id = ${req.user.id} AND is_debt = 1`, (err, results) => {
        res.send(results)
    })
})

router.post('/', (req, res) => {
    db.query(`INSERT INTO assets VALUES (null, '${req.body.name}', '${req.body.type}', ${req.body.value}, ${req.body.is_debt}, 0, ${req.user.id})`, (err, results) => {
        db.query(`INSERT INTO asset_history VALUES (null, '${req.body.value}', CURRENT_DATE(), ${results.insertId})`, (err, results) => {
            res.send(results)
        })
    })
})

router.put('/:id', (req, res) => {
    // Update the asset data
    db.query(`UPDATE assets SET name = '${req.body.name}', type = '${req.body.type}', value = ${req.body.value}, is_debt = ${req.body.is_debt}, is_deleted = 0, user_id = ${req.user.id} WHERE id = ${req.params.id}`, (err, results) => {
        // Check if there is already current value data
        db.query(`SELECT * FROM asset_history WHERE asset_id = ${req.params.id} AND date = CURRENT_DATE()`, (err, results) => {
            // If there is, update the current value data
            if (results.length) {
                db.query(`UPDATE asset_history SET value = ${req.body.value} WHERE asset_id = ${req.params.id} AND date = CURRENT_DATE()`, (err, results) => {
                    res.send(results)
                })
            }
            // If not, add new data for today
            else {
                db.query(`INSERT INTO asset_history VALUES (null, '${req.body.value}', CURRENT_DATE(), ${req.params.id})`, (err, results) => {
                    res.send(results)
                })
            }
        })
    })
})

router.delete('/:id', (req, res) => {
    db.query(`UPDATE assets SET is_deleted = 1 WHERE id = ${req.params.id}`, (err, results) => {
        db.query(`INSERT INTO asset_history VALUES (null, 0, CURRENT_DATE(), ${req.params.id})`, (err, results) => {
            res.send(results)
        })
    })
})
module.exports = router