import mongoose from 'mongoose';
import app from './app';
export default (overwritePort) => {
  const port = overwritePort || app.get('port');
  const server = app.listen(port);
  server.on('listening', () => {
    app.logger.info(`Feathers application started on ${app.get('host')}:${port}`)
    app.logger.verbose("Connect to db.")
    mongoose.connect(app.get('mongodb'));
    mongoose.Promise = global.Promise;
  });

  server.on('close', () => {
    app.logger.verbose("Close connection to db.")
    mongoose.connection.close()
  });
  return server;
};
