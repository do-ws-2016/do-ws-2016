import service from 'feathers-mongoose';
import post from './post-model';
import hooks from './hooks';

module.exports = function() {
  const app = this;

  const options = {
    Model: post,
    // paginate: {
    //   default: 5,
    //   max: 25
    // }
  };

  // Initialize our service with any options it requires
  app.use('/posts', service(options));

  // Get our initialize service to that we can bind hooks
  const postService = app.service('/posts');

  // Set up our before hooks
  postService.before(hooks.before);

  // Set up our after hooks
  postService.after(hooks.after);
};
