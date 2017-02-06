import hooks from 'feathers-hooks'
import { hooks as auth } from 'feathers-authentication'

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser()
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}

exports.after = {
  all: [
    hooks.remove('password')
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}
