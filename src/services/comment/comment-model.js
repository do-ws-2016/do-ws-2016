// comment-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
  content: { type: String, required: true },
  authorId: { type: String, required: true},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now },
  postId: { type: String}
});

const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;
