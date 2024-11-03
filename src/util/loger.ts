import { createLogger, format, transports } from 'winston'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports'
import util from 'util'
import config from '../config/config'
import { EApplicationEnvionment } from '../constent/application'
import path from 'path'
import * as sourceMapSupport from 'source-map-support'

//Linking trace support
sourceMapSupport.install()

const consoleFormate = format.printf((info) => {
    const { level, message, timestamp, meta } = info
    const customLevel = level.toUpperCase()
    const customTimestamp = timestamp
    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null
    })

    const customLog = `${customLevel} [${customTimestamp}] ${message} \n ${'META'} ${customMeta}\n`
    return customLog
})

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.ENV === EApplicationEnvionment.PRODUCTION) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleFormate)
            })
        ]
    }
    return []
}

const fileFormate = format.printf((info) => {
    const { level, message, timestamp, meta } = info
    const logMeta: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                stack: value.stack || null
            }
        } else {
            logMeta[key] = value
        }
    }

    const logData = {
        level: level.toUpperCase(),
        message,
        timestamp,
        meta: logMeta
    }

    return JSON.stringify(logData, null, 4)
})

const fileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileFormate)
        })
    ]
}

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...fileTransport(), ...consoleTransport()]
})
