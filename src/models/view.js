import mongoose, { mongo } from 'mongoose'

const { Schema } = mongoose

const ViewSchema = new Schema({
  ip: {
    type: String,
  },
  user_agent: {
    type: String,
  },
  url: {
    type: String,
  },
  count: {
    type: Number,
    default: 1,
  },
  address: {
    type: String,
  },
  created_at: {
    type: Number,
  },
  update_at: {
    type: Number,
  }
}, {versionKey: false})

const View = mongoose.model('viewdata', ViewSchema)

export default View
