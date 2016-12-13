import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const ImageType = {
  __parseValue(value) {
    return new Image(value); // value from the client
  },
  __serialize(value) {
    return value.toString(); // value sent to the client
  },
  __parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return parseString(ast.value) // ast value is always in string format
    }
    return null;
  },
};

class Image {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }
}

export {
  ImageType,
  Image,
}
