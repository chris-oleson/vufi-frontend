const express = require('express')
const app = express()
const port = 3000

// Enables parsing cookie data
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Enables session data
const session = require('express-session')
app.use(session({
    secret: 'ABCDEFG',
    resave: false,
    saveUninitialized: false
}))

// Registered routes
const login = require('./routes/login')
app.use('/api/login', login)
const users = require('./routes/users')
app.use('/api/users', users)
const assets = require('./routes/assets')
app.use('/api/assets', assets)
const debts = require('./routes/debts')
app.use('/api/debts', debts)

app.use(express.json())

app.listen(port, () => {
    console.log('listening on port ' + port)
})