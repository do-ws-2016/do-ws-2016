import request from 'request-promise';

export default function getResolvers() {
  let app = this;

  let Posts = app.service('posts');
  let Recipes = app.service('recipes');
  let Users = app.service('users');
  let Comments = app.service('comments');
  let Viewer = app.service('viewer');
  const localRequest = request.defaults({
    baseUrl: `http://${app.get('host')}:${app.get('port')}`,
    json: true
  });

  return {
    User: {
      posts(user, args, context) {
        return Posts.find({
          query: {
            authorId: user._id
          }
        });
      }
    },
    Post: {
      comments(post, { limit }, context) {
        return Comments.find({
          query: {
            postId: post._id
          }
        });
      },
      author(post, args, context) {
        return Users.get(post.authorId);
      }
    },
    Recipe: {
      author(recipe, args, context) {
        return Users.get(recipe.authorId);
      }
    },
    Comment: {
      author(comment, args, context) {
        return Users.get(comment.authorId);
      }
    },
    AuthPayload: {
      data(auth, args, context) {
        return auth.data;
      }
    },
    RootQuery: {
      viewer(root, args, context) {
        return Viewer.find(context);
      },
      author(root, { username }, context) {
        return Users.find({
          query: {
            username
          }
        }).then((users) => users[0]);
      },
      authors(root, args, context) {
        return Users.find({})
      },
      posts(root, { category }, context) {
        if (category) {
          return Posts.find({
            query: {
              category
            }
          });
        }
        return Posts.find({});
      },
      recipes(root, args, context) {
        return Recipes.find({});
      },
      post(root, { _id }, context) {
        return Posts.get(_id)
      }
    },

    RootMutation: {
      signUp(root, args, context) {
        return Users.create(args)
      },
      logIn(root, {username, password}, context) {
        return localRequest({
          uri: '/auth/local',
          method: 'POST',
          body: { username, password }
        });
      },
      createPost(root, {post}, context) {
        return Posts.create(post, context);
      },
      createRecipe(root, {recipe}, context) {
        return Recipes.create(recipe, context);
      },
      createComment(root, args, context) {
        return Comments.create(args, context);
      },
      removePost(root, { _id }, context) {
        return Posts.remove(_id, context);
      },
      removeComment(root, { _id }, context) {
        return Comments.remove(_id, context);
      }
    }

  }
}
