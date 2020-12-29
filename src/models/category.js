import mongoose, { mongo } from 'mongoose'

const { Schema } = mongoose

const CategorySchema = new Schema({
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
  created_at: {
    type: Number,
  },
  update_at: {
    type: Number,
  }
}, {versionKey: false})

const Category = mongoose.model('categorydata', CategorySchema)

export default Category
