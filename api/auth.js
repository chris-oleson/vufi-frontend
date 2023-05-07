const express = require('express');
const app = express();
const mysql = require('mysql2')
const passport = require('passport')
const { Strategy } = require('passport-local')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const connection = mysql.createConnection(process.env.DATABASE_URL)

// Parsing data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json())

// Passport functions
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    connection.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
        if (results.length) {
            done(null, results[0])
        }
        else {
            done(null, null)
        }
    })
})

passport.use(
    new Strategy(
        { usernameField: 'email' },
        (email, password, done) => {
            // Search for matching email
            connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
                if (results.length) {
                    // Check if password matches
                    bcrypt.compare(password, results[0].password, (err, match) => {
                        if (match) {
                            done(null, results[0])
                        }
                        else {
                            done(null, false)
                        }
                    })
                }
                else {
                    done(null, false)
                }
            })
        }
    )
)

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

// Log In
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200)
})

module.exports = app;