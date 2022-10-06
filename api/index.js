const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
require('./strategies/local')
const app = express()
const port = 3000
const memoryStore = new session.MemoryStore()

// Parsing data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json())

// Set up session data
app.use(
    session({
        secret: 'mysecret',
        resave: false,
        saveUninitialized: false,
        store: memoryStore,
        cookie: {
            secure: false,
            sameSite: 'strict',
        },
    })
)

// Using passport
app.use(passport.initialize())
app.use(passport.session())

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