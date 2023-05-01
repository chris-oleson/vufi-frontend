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

// Retreive debt data
router.get('/', (req, res) => {
    db.query("SELECT * FROM assets WHERE user_id = ? AND is_debt = 1", [req.user.id], (err, results) => {
        res.send(results)
    })
})

// Retreive historic debt data
router.get('/history', (req, res) => {
    db.query("SELECT asset_history.\`value\`, asset_history.\`date\`, asset_id FROM asset_history, assets where asset_id = assets.id and user_id = ? AND is_debt = 1", [req.user.id], (err, results) => {
        res.send(results)
    })
})

// Adding a new debt
router.post('/', (req, res) => {
    db.query("INSERT INTO assets VALUES (null, ?, ?, ?, 1, 0, ?)", [req.body.name, req.body.type, req.body.value, req.user.id], (err, results) => {
        db.query("INSERT INTO asset_history VALUES (null, ?, CURRENT_DATE(), ?)", [req.body.value, results.insertId], (err, results) => {
            res.send(results)
        })
    })
})

// Updating an debt
router.put('/:id', (req, res) => {

    // Update the debt data
    db.query("UPDATE assets SET name = ?, type = ?, value = ?, is_debt = 1, is_deleted = 0, user_id = ? WHERE id = ?", [req.body.name, req.body.type, req.body.value, req.user.id, req.params.id], (err, results) => {
        
        // Check if there is already current value data
        db.query("SELECT * FROM asset_history WHERE asset_id = ? AND date = CURRENT_DATE()", [req.params.id], (err, results) => {

            // If there is, update the current value data
            if (results.length) {
                db.query("UPDATE asset_history SET value = ? WHERE asset_id = ? AND date = CURRENT_DATE()", [req.body.value, req.params.id], (err, results) => {
                    res.send(results)
                })
            }

            // If not, add new data for today
            else {
                db.query("INSERT INTO asset_history VALUES (null, ?, CURRENT_DATE(), ?)", [req.body.value, req.params.id], (err, results) => {
                    res.send(results)
                })
            }
        })
    })
})


// Deleting an asset
router.delete('/:id', (req, res) => {

    // Delete the asset
    db.query("UPDATE assets SET is_deleted = 1 WHERE id = ?", [req.params.id], (err, results) => {

        // Check if there is already current historic data
        db.query("SELECT * FROM asset_history WHERE asset_id = ? AND date = CURRENT_DATE()", [req.params.id], (err, results) => {

            // If there is, update today's value to 0
            if (results.length) {
                db.query("UPDATE asset_history SET value = 0 WHERE asset_id = ? AND date = CURRENT_DATE()", [req.params.id], (err, results) => {
                    res.send(results)
                })
            }

            // If not, add a 0 value for today
            else {
                db.query("INSERT INTO asset_history VALUES (null, 0, CURRENT_DATE(), ?)", [req.params.id], (err, results) => {
                    res.send(results)
                })
            }
        })
    })
})

module.exports = router