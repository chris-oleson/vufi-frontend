const passport = require('passport')
const { Strategy } = require('passport-local')
const db = require('../database')
const bcrypt = require('bcryptjs')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    db.query(`SELECT * FROM users WHERE id = ${id}`, (err, results) => {
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
            db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, results) => {
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