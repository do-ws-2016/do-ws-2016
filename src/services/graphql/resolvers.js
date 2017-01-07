import localLogin from '../authentication/localLogin';
import { ImageType, Image } from './imageType';
import  { buffer2Img, img2Buffer } from '../../tools/img';

export default function getResolvers() {
  const app = this;
  const Recipes = app.service('recipes');
  const Cookbooks = app.service('cookbooks');
  const Users = app.service('users');
  const Viewer = app.service('viewer');
  const login = localLogin.bind(app);

  return {
    Image: ImageType,
    User: {
      recipes(user, args, context) {
        return Recipes.find({
          query: {
            authorId: user._id
          }
        });
      },
      cookbooks(user, args, context) {
        return Cookbooks.find({
          query: {
            authorId: user._id
          }
        });
      }
    },
    Recipe: {
      author(recipe, args, context) {
        return Users.get(recipe.authorId);
      },
      thumbnail(recipe, {width, height, greyscale}, context) {
        return buffer2Img(recipe.image, {width, height, greyscale});
      },
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
      thumbnail(recipe, {width, height, greyscale}, context) {
        return buffer2Img(recipe.image, {width, height, greyscale});
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
      recipe(root, {_id}, context) {
        return Recipes.get(_id);
      },
      cookbooks(root, args, context) {
        return Cookbooks.find({});
      },
      cookbook(root, {_id}, context) {
        return Cookbooks.get(_id);
      },
    },

    RootMutation: {
      signUp(root, args, context) {
        return Users.create(args)
      },
      logIn(root, {username, password}, context) {
        return login(username, password);
      },
      createRecipe(root, { recipe, imageUrl }, context) {
        if (!imageUrl) {
          return Recipes.create(recipe, context);
        }
        return img2Buffer(imageUrl).then((image) => {
          const data = recipe;
          data.image = image;
          return Recipes.create(data, context);
        })
      },
      createCookbook(root, { cookbook, imageUrl }, context) {
        if (!imageUrl) {
          return Cookbooks.create(cookbook, context);
        }
        return img2Buffer(imageUrl).then((image) => {
          const data = cookbook;
          data.image = image;
          return Cookbooks.create(data, context);
        })
      },
      addRecipeToCookbook(root, { cookbook, recipes }, context) {
        return Cookbooks.patch(cookbook, { recipes }, context);
      },
    }
  }
}
