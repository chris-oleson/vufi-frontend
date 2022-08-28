const { Router } = require('express')
const router = Router()

router.get('/:id/preferences', (req, res) => {
    let id = req.params.id

    
    res.send(user)
})

module.exports = router