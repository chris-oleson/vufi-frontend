const { Router } = require('express')
const router = Router()

// Fake database
const users = [
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
    res.send(users)
})

router.get('/:id', (req, res) => {
    let id = req.params.id
    let user = users.find((user) => user.id == id)
    res.send(user)
})

module.exports = router