const express = require('express')
const app = express()
const port = 3000

// Enables parsing cookie data
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.json())

// Enables session data
const session = require('express-session')
app.use(session({
    secret: 'ABCDEFG',
    resave: false,
    saveUninitialized: false
}))

// Registered routes
const auth = require('./routes/auth')
app.use('/api/auth', auth)
const user = require('./routes/user')
app.use('/api/user', user)
const assets = require('./routes/assets')
app.use('/api/assets', assets)
const debts = require('./routes/debts')
app.use('/api/debts', debts)


app.listen(port, () => {
    console.log('Listening on port ' + port)
})