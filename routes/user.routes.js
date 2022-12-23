import { Router } from 'express'
import passport from 'passport'
import { genPassword } from '../lib/passwordUtils.js'
import User from '../models/user.model.js'

export const userRoutes = new Router()

userRoutes.get('/', (req, res, next) => {
  res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>')
})

userRoutes.post('/login', passport.authenticate('local', {
  failureRedirect: '/login-failure',
  successRedirect: '/login-success'
}))

userRoutes.post('/register', (req, res) => {
  const saltHash = genPassword(req.body.password)
  const { salt, hash } = saltHash

  const newUser = new User({
    username: req.body.username,
    hash,
    salt
  })

  newUser.save()
    .then(user => {
      console.log(user)
    })

  res.redirect('/login')
})

userRoutes.get('/login', (req, res) => {
  const form = `<h1>Login Page</h1><form method="POST" action="/login">
                Enter Username:<br><input type="text" name="username">
                <br>Enter Password:<br><input type="password" name="password">
                <br><br><input type="submit" value="Submit"></form>`
  res.send(form)
})

userRoutes.get('/register', (req, res) => {
  const form = `<h1>Register Page</h1><form method="post" action="register">
                Enter Username:<br><input type="text" name="username">
                <br>Enter Password:<br><input type="password" name="password">
                <br><br><input type="submit" value="Submit"></form>`
  res.send(form)
})

userRoutes.get('/protected-route', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>')
  } else {
    res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>')
  }
})

// Visiting this route logs the user out
userRoutes.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

userRoutes.get('/login-success', (req, res, next) => {
  res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>')
})

userRoutes.get('/login-failure', (req, res, next) => {
  res.send('You entered the wrong password.')
})
