// @flow
import globalHooks, { restrictedAccess } from '../../../hooks';
import hooks from 'feathers-hooks';
import { hooks as auth } from 'feathers-authentication';

exports.before = {
  all: [],
  find: [],
  get: [],
  create: restrictedAccess,
  update: restrictedAccess,
  patch: restrictedAccess,
  remove: restrictedAccess,
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
