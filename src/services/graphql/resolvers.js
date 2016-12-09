import localLogin from '../authentication/localLogin';

export default function getResolvers() {
  const app = this;
  const Recipes = app.service('recipes');
  const Cookbook = app.service('cookbooks');
  const Users = app.service('users');
  const Viewer = app.service('viewer');
  const login = localLogin.bind(app);

  return {
    User: {
      recipes(user, args, context) {
        return Recipes.find({
          query: {
            authorId: user._id
          }
        });
      },
      cookbooks(user, args, context) {
        return Cookbook.find({
          query: {
            authorId: user._id
          }
        });
      }
    },
    Recipe: {
      author(recipe, args, context) {
        return Users.get(recipe.authorId);
      }
    },
    Cookbook: {
      author(cookbook, args, context) {
        return Users.get(cookbook.authorId);
      },
      recipes(cookbook, args, context) {
        return Recipes.find({
          query: {
            _id: cookbook.recipes
          }
        });
      },
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
      recipes(root, args, context) {
        return Recipes.find({});
      },
      cookbook(root, args, context) {
        return Cookbook.find({});
      },
    },

    RootMutation: {
      signUp(root, args, context) {
        return Users.create(args)
      },
      logIn(root, {username, password}, context) {
        return login(username, password);
      },
      createRecipe(root, {recipe}, context) {
        return Recipes.create(recipe, context);
      },
    }
  }
}
