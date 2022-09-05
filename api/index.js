const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// Registered routes
const auth = require('./routes/auth')
app.use('/api/auth', auth)
const user = require('./routes/user')
app.use('/api/user', user)
const preferences = require('./routes/preferences')
app.use('/api/preferences', preferences)
const assets = require('./routes/assets')
app.use('/api/assets', assets)
const debts = require('./routes/debts')
app.use('/api/debts', debts)


app.listen(port, () => {
    console.log('Listening on port ' + port)
})