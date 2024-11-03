import { Request } from 'express'
import { ThhtpError } from '../types/types'
import responceseMessage from '../constent/responceseMessage'
import config from '../config/config'
import { EApplicationEnvionment } from '../constent/application'

export default (error: Error | unknown, req: Request, errorStatusCode: number = 500): ThhtpError => {
    const errorObj: ThhtpError = {
        success: false,
        statusCode: errorStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: error instanceof Error ? error.message || responceseMessage.ERROR : responceseMessage.ERROR,
        data: error,
        trace: error instanceof Error ? { error: error.stack } : null
    }

    // Log
    // eslint-disable-next-line no-console
    console.info('CONTROLLER_RESPONSE', {
        meta: errorObj
    })

    //Production env check
    if (config.ENV === EApplicationEnvionment.PRODUCTION) {
        delete errorObj.request.ip
        delete errorObj.trace
    }
    return errorObj
}
