import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responceseMessage from '../constent/responceseMessage'
import httpError from '../util/httpError'
export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            //throw new Error('this is error')
            httpResponse(req, res, 200, responceseMessage.SUCCESS, null)
        } catch (error) {
            httpError(next, error, req, 500)
        }
    }
}
