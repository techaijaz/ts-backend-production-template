import config from './config/config'
import app from './app'

const server = app.listen(config.PORT, () => {})

;(() => {
    try {
        // eslint-disable-next-line no-console
        console.info('APPLICATION STARTED', {
            meta: {
                PORT: config.PORT,
                SERVVER_URL: config.SERVER_URL
            }
        })
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('APPLICATION STARTED', { meta: error })
        server.close(() => {
            if (error) {
                // eslint-disable-next-line no-console
                console.error('APPLICATION STARTED', { meta: error })
            }
            process.exit(1)
        })
    }
})()
