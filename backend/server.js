import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import memberRouter from './routers/memberRouter.js'
import userRouter from './routers/userRouter.js'
import uploadRouter from './routers/uploadRouter.js'

dotenv.config()

const app = express()

//All request will be tranferred to req.body in the application.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Connect to mongodb
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/church18', {
  useNewUrlparser: true,
  useUnifiedTopology: true,
})

//Connect to route
app.use('/api/uploads', uploadRouter)
app.use('/api/users', userRouter)
app.use('/api/members', memberRouter)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.get('/', (req, res) => {
  res.send('Server is ready')
})

//To detect errors middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})
