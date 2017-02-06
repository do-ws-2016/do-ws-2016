// Add any common hooks you want to share across services in here.
//
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.
import { hooks as auth } from 'feathers-authentication'

const restrictedAccess = [
  auth.verifyToken(),
  auth.populateUser(),
  auth.restrictToAuthenticated(),
  auth.associateCurrentUser({as: 'authorId'})
]

exports.logResult = function (options) {
  return function (hook) {
    console.log({options, result: hook.result})
  }
}
exports.restrictedAccess = restrictedAccess
