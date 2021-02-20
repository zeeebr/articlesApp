const { createLogger, format, transports } = require('winston')
const { combine, label, printf } = format
const moment = require('moment')
const env = require('./env')

const timezoned = () => {
    let date = moment().add(env.UTC, 'h').format('YYYY-MM-DD HH:mm:ss')
    return date
}

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const winston = createLogger({
    format: combine(
        label({ label: 'ArticlesApp' }),
        format.timestamp({ format: timezoned }),
        myFormat
      ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/combined.log' })
    ]
})

async function logger(message) {
    winston.log({
        level: 'info',
        message: message
    })
}  

module.exports = logger