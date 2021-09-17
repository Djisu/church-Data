import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import memberRouter from './models/memberRouter.js'
import userRouter from './routers/userRouter.js'

dotenv.config()

const app = express()

//Connect to mongodb
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/church18', {
  useNewUrlparser: true,
  useUnifiedTopology: true,
})

app.get('/', (req, res) => {
  res.send('Server is ready')
})

//Connect to route
app.use('/api/users', userRouter)
app.use('/api/members', memberRouter)

//To detect errors middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})
