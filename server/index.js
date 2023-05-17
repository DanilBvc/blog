import express from 'express'

import mongoose from 'mongoose'
import { loginValidation, postCreateValidation, regiterValidation } from './validations/validation.js'
import cors from 'cors'
import { validationErrors, checkAuth } from './utils/index.js'
import multer from 'multer'
import { PostControllers, UserControllers } from './controllers/index.js'
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.MONGODB_API_KEY).then(() => {
  console.log('db ok')
}).catch((err) => console.log(`err ${err}`))

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    console.log(file)
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return req.statusCode(501);
    }
  }
})



app.use(express.json())
app.use(cors())
app.get('/', (request, response) => {
  response.send('H11i')
})


app.post('/auth/login', loginValidation, validationErrors, UserControllers.login)

app.post('/auth/register', regiterValidation, validationErrors, UserControllers.register)

app.get('/auth/me', checkAuth, UserControllers.whoAmI)

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.use('/uploads', express.static('uploads'))

app.get('/posts', PostControllers.getAll)
app.get('/posts/:id', PostControllers.getOne)
app.post('/posts', checkAuth, postCreateValidation, validationErrors, PostControllers.create)
app.delete('/posts/:id', checkAuth, PostControllers.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, validationErrors, PostControllers.update)

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('ok')
})
