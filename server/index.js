import express from 'express'

import mongoose from 'mongoose'
import { regiterValidation } from './validations/auth.js'
import checkAuth from './utils/checkAuth.js'
import user from './models/user.js'
import { login, register, whoAmI } from './controllers/UserController.js'
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.MONGODB_API_KEY).then(() => {
  console.log('db ok')
}).catch((err) => console.log(`err ${err}`))

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  response.send('H11i')
})

app.post('/auth/login', login)

app.post('/auth/register', regiterValidation, register)


app.get('/auth/me', checkAuth, whoAmI)

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('ok')
})
