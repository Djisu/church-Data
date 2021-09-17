import mongoose from 'mongoose'

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    telno: { type: String, required: true },
    employment: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    gpAddress: { type: String },
  },
  {
    timestamps: true,
  },
)
const Member = mongoose.model('Member', memberSchema)
export default Member
