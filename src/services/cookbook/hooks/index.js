import { restrictedAccess } from '../../../hooks'

exports.before = {
  all: [],
  find: [],
  get: [],
  create: restrictedAccess,
  update: restrictedAccess,
  patch: restrictedAccess,
  remove: restrictedAccess
}

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}
