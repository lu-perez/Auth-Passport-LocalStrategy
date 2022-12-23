import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { passportConfig } from './config/passport.js'
import { connectDB } from './db/mongodb.js'
import { userRoutes } from './routes/user.routes.js'
passportConfig(passport)
dotenv.config()

const app = express()
const PORT = 4444

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collection: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(userRoutes)

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
  connectDB()
})
