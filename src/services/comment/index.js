import service from 'feathers-mongoose';
import comment from './comment-model';
import hooks from './hooks';

module.exports = function() {
  const app = this;

  const options = {
    Model: comment,
    // paginate: {
    //   default: 5,
    //   max: 25
    // }
  };

  // Initialize our service with any options it requires
  app.use('/comments', service(options));

  // Get our initialize service to that we can bind hooks
  const commentService = app.service('/comments');

  // Set up our before hooks
  commentService.before(hooks.before);

  // Set up our after hooks
  commentService.after(hooks.after);
};
