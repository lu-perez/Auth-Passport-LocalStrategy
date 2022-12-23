import { Strategy as LocalStrategy } from 'passport-local'
import { validPassword } from '../lib/passwordUtils.js'
import User from '../models/user.model.js'

export const passportConfig = (passport) => {
  passport.use(new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    (username, password, done) => {
      User.findOne({ username })
        .then(user => {
          if (!user) {
            return done(null, false)
          }
          const isValid = validPassword(password, user.hash, user.salt)
          if (isValid) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
        .catch(err => {
          done(err)
        })
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((userId, done) => {
    User.findById(userId)
      .then(user => {
        done(null, user)
      })
  })
}
