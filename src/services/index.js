import viewer from './viewer';
import comment from './comment';
import post from './post';
import graphql from './graphql';
import authentication from './authentication';
import user from './user';
import mongoose from 'mongoose';

module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(user);
  app.configure(post);
  app.configure(comment);
  app.configure(viewer);
  app.configure(graphql);
};
