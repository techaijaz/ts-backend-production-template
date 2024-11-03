import config from './config/config'
import app from './app'
import logger from './util/loger'

const server = app.listen(config.PORT, () => {})

;(() => {
    try {
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
