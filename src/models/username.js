import mongoose from 'mongoose'

const { Schema } = mongoose

// mongodb不能成为表，叫做文档或者集合
// 每个Schema 对应MongoDB中的一个集合

const NameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
    default: 'auth'
  }

}, {
  versionKey: false
})

const UserName = mongoose.model('usernamedata', NameSchema)

export default UserName 
