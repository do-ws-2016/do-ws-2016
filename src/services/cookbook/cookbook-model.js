// cookbook-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

import mongoose, { Schema } from 'mongoose'

const Cookbook = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  tags: {
    type: [String]
  },
  recipes: {
    type: [String]
  },
  createdAt: {
    type: Date,
    'default': Date.now
  },
  updatedAt: {
    type: Date,
    'default': Date.now
  },
  authorId: {
    type: String
  },
  image: {
    type: Buffer
  }
})
const cookbookModel = mongoose.model('cookbook', Cookbook)

module.exports = cookbookModel
