import mongoose from 'mongoose'

const { Schema } = mongoose

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
  summary: {
    type: String,
  },
  content: {
    type: String,
  },
  html: {
    type: String,
  },
  toc: {
    type: String,
  },
  category: {
    type: Object,
  },
  tags: {
    type: Array,
  },
  state: {
    type: String,
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0,
  },
  is_comment_table: {
    type: Boolean,
    default: true,
  },
  publish_at: {
    type: Number,
  },
  created_at: {
    type: Number,
  },
  update_at: {
    type: Number,
  }
}, {versionKey: false})

const Article = mongoose.model('articledata', ArticleSchema)

export default Article
