import express from 'express'
const http = require('http');
import mongoose from 'mongoose'
import { loginValidation, postCreateValidation, regiterValidation, updateProfileValidation } from './validations/validation.js'
import cors from 'cors'
import { validationErrors, checkAuth } from './utils/index.js'
import multer from 'multer'
import { PostControllers, UserControllers, MessageControllers } from './controllers/index.js'
import dotenv from 'dotenv'
import { Server } from 'socket.io';
const socketIO = require('socket.io');
dotenv.config()
mongoose.connect(process.env.MONGODB_API_KEY as string).then(() => {
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
      return (req as any).statusCode(501);
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
app.patch('/profile/:id', checkAuth, updateProfileValidation, validationErrors, UserControllers.updateUser)


app.get('/people', checkAuth, validationErrors, UserControllers.getAllUsers)
app.post('/people', checkAuth, validationErrors, UserControllers.addFriend)
app.get('/people/:id', UserControllers.getUserById)


app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req?.file?.originalname}`
  })
})

app.use('/uploads', express.static('uploads'))

app.get('/message', checkAuth, MessageControllers.getUserMessages)
app.get('/message/search', checkAuth, MessageControllers.searchUsersChat)
app.get('/message/:id', checkAuth, MessageControllers.addChat)

app.get('/posts', PostControllers.getAll)
app.get('/post/:id', PostControllers.getOne)
app.get('/posts/:id', checkAuth, validationErrors, PostControllers.getAllUserPosts)
app.post('/posts', checkAuth, postCreateValidation, validationErrors, PostControllers.create)
app.delete('/posts/:id', checkAuth, PostControllers.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, validationErrors, PostControllers.update)


const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket: any) => {
  console.log('connected');
});

server.listen(4444, () => {
  console.log('Server is running');
}).on('error', (err: Error) => {
  console.log('Error starting server:', err);
});
