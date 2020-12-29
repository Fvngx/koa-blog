import mongoose from 'mongoose'

const { Schema } = mongoose

const CommentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  content: {
     type: String,
     required: true,
  },
  pass: {
    type: Boolean,
    default: false,
  },
  userAgent: {
    type: String,
  },
  host_id: {
    type: String,
  },
  is_host_in_page: {
    type: Boolean,
    default: false,
  },
  parent_comment_id: {
    type: String,
  },
  reply_user_name: {
    type: String,
  },
  reply_user_email: {
    type: String,
  },
  created_at: {
    type: Number,
  },
  update_at: {
    type: Number,
  }
}, {versionKey: false})

const Comment = mongoose.model('commentdata', CommentSchema)

export default Comment
