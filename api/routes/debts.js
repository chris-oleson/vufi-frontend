const { Router } = require('express')
const router = Router()

// Fake database
const debts = [
    {
        "id": 1,
        "firstName": "Chris",
        "lastName": "Oleson",
        "email": "crolesonjr@gmail.com",
        "password": "password"
    },
    {
        "id": 2,
        "firstName": "Test",
        "lastName": "Testerson",
        "email": "email@email.com",
        "password": "password"
    }
]

router.get('/', (req, res) => {
    res.send(debts)
})

router.get('/:id', (req, res) => {
    let id = req.params.id
    let debt = debts.find((debt) => debt.id == id)
    res.send(debt)
})

module.exports = router