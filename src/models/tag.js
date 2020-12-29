import mongoose from 'mongoose'

const { Schema } = mongoose

const TagSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  articles: {
    type: Array,
  },
  create_at: {
    type: Number,
  },
  update_at: {
    type: Number,
  }
}, {versionKey: false})

const Tag = mongoose.model('tagdata', TagSchema)

export default Tag
