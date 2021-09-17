import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Member from '../models/memberModel.js'

const memberRouter = express.Router()

memberRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const members = await Member.find({})

    if (members) {
      res.send(members)
    } else {
      res.status(404).send({ message: 'Members not found' })
    }
  }),
)

memberRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Member.remove({})
    const createdMembers = await Member.insertMany(data.members)
    res.send({ createdMembers })
  }),
)

memberRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const member = await Member.findById(req.params.id)
    if (member) {
      res.send(member)
    } else {
      res.status(404).send({ message: 'Members not found' })
    }
  }),
)
export default memberRouter
