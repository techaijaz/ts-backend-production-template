import config from './config/config'
import app from './app'
import logger from './util/loger'
import databseService from './service/databseService'

const server = app.listen(config.PORT, () => {})

;(async () => {
    try {
        const connection = await databseService.connect()

        logger.info('DATABASE CONNECTION', {
            meta: {
                CONNECTION_NAME: connection.name
            }
        })
        logger.info('APPLICATION STARTED', {
            meta: {
                PORT: config.PORT,
                SERVVER_URL: config.SERVER_URL
            }
        })
    } catch (error) {
        logger.error('APPLICATION STARTED', { meta: error })
        server.close(() => {
            if (error) {
                logger.error('APPLICATION STARTED', { meta: error })
            }
            process.exit(1)
        })
    }
})()
