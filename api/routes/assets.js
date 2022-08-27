const { Router } = require('express')
const router = Router()

// Fake database
const assets = [
    {
        "assetName": "401k",
        "value": 50000,
        "editing": false,
        "id": 2
    },
    {
        "assetName": "Checking Account",
        "value": 4500,
        "editing": false,
        "id": 3
    },
    {
        "assetName": "Car",
        "value": 10000,
        "editing": false,
        "id": 6
    },
    {
        "assetName": "Savings Account",
        "value": 9000,
        "editing": false,
        "id": 7
    }
]

router.get('/', (req, res) => {
    res.send(assets)
})

router.get('/:id', (req, res) => {
    let id = req.params.id
    let asset = assets.find((asset) => asset.id == id)
    res.send(asset)
})

module.exports = router