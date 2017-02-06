import logger from 'winston'
import { colorize } from 'winston/lib/winston/config'
module.exports = function (app) {
  // Add a logger to our app object for convenience
  app.logger = logger
  const level = app.get('logLevel') || 'info'
  const formatter = ({level, timestamp, message = '', meta}) => {
    const time = timestamp().toLocaleTimeString()
    const title = colorize(level, `[${time} ${level.toUpperCase()}]`)
    const metaText = meta && Object.keys(meta).length ? '\n' + JSON.stringify(meta, null, 2) : ''
    return `${title} ${message} ${metaText}`
  }
  logger.remove(logger.transports.Console)
  logger.add(logger.transports.Console, {
    handleExceptions: true,
    humanReadableUnhandledException: true,
    colorize: true,
    prettyPrint: true,
    level: level,
    timestamp: () => new Date(),
    formatter
  })
  const cLog = (level, channel, ...rest) => logger.log(level, colorize(level, `〉${channel}〈`), ...rest)
  app.logger.clog = cLog
  if (process.env.NODE_ENV === 'test') {
    logger.remove(logger.transports.Console)
  }
  return function (error, req, res, next) {
    if (error) {
      const message = `${error.code ? `(${error.code}) ` : ''}Route: ${req.url} - ${error.message}`

      if (error.code === 404) {
        logger.info(message)
      } else {
        logger.error(message)
        // logger.info(error.stack);
      }
    }

    next(error)
  }
}
