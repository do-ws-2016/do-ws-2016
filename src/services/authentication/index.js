import authentication from 'feathers-authentication';

module.exports = function() {
  const app = this;

  let config = Object.assign(
    {},
    app.get('auth'),
    { local:
      {usernameField: 'username'}
    },
  );
  app.configure(authentication(config));
};
