const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')

// Fake database
const users = [
    {
        "id": 1,
        "firstName": "Chris",
        "lastName": "Oleson",
        "email": "crolesonjr@gmail.com",
        "password": "$2a$10$Tk5IZxkznWUn/Udhjhrr5um4wrCMpP8PC4m9YS3aldkFfqm4bpyT2"
    },
    {
        "id": 2,
        "firstName": "Test",
        "lastName": "Testerson",
        "email": "email@email.com",
        "password": "password"
    }
]

router.get('/:email/:password', (req, res) => {
    let match = false;
    for (let i=0; i < users.length; i++) {
        if (users[i].email === req.params.email) {
            if (bcrypt.compare(req.params.password, users[i].password)) {
                match = true
                res.send(users[i].id.toString())
            }
        }
    }
    if (!match) {
        res.sendStatus(404)
    }
})

module.exports = router