import mongoose, { mongo } from 'mongoose'

const { Schema } = mongoose

const SearchSchema = new Schema({
  type: {
    type: String,
  },
  keyword: {
    type: String,
  },
  count: {
    type: Number,
    default: 1,
  },
  created_at: {
    type: Number,
  },
  update_at: {
    type: Number,
  }
}, {versionKey: false})

const Search = mongoose.model('searchdata', SearchSchema)

export default Search
