import service from 'feathers-mongoose'
import cookbook from './cookbook-model'
import hooks from './hooks'

module.exports = function () {
  const app = this

  const options = {
    Model: cookbook
    // paginate: {
    //   default: 5,
    //   max: 25
    // }
  }

  // Initialize our service with any options it requires
  app.use('/cookbooks', service(options))

  // Get our initialize service to that we can bind hooks
  const cookbookService = app.service('/cookbooks')

  // Set up our before hooks
  cookbookService.before(hooks.before)

  // Set up our after hooks
  cookbookService.after(hooks.after)
}
