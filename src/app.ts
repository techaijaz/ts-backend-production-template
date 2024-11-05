import express, { Application } from 'express'
import path from 'path'
import router from './router/apiRouter'
import globalErrorHandler, { notFoundError } from './middleware/globalErrorHandler'
import helmet from 'helmet'

const app: Application = express()
//Middlewares
app.use(helmet())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

//Routs
app.use('/api/v1', router)

//404 Error handeler
app.use(notFoundError)

//Global Error handeler
app.use(globalErrorHandler)

export default app
