import mongoose from 'mongoose'

const { Schema } = mongoose

const SMTPSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  html: {
    type: String,
    required: true,
  },
  create_at: {
    type: Number,
    required: true,
  }
}, {
  versionKey: false
})

const SMTP = mongoose.model('smtpdata', SMTPSchema)

export default SMTP 
