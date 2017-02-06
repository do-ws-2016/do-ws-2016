// recipe-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

import mongoose, { Schema } from 'mongoose'

const Task = new Schema({
  title: { type: String, required: true },
  duration: { type: Number },
  method: { type: String },
  intensity: { type: String }
})

const Recipe = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  tags: { type: [String] },
  sequence: { type: [Task] },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now },
  authorId: { type: String },
  image: { type: Buffer }
})

module.exports = mongoose.model('recipe', Recipe)
