const envalid = require('envalid')

const { str, port, num } = envalid
 
const env = envalid.cleanEnv(process.env, {
    DB_NAME:            str(),
    DB_USER:            str(),
    DB_PASSWORD:        str(),
    DB_HOST:            str(),
    PORT:               port(),
    REDIS_HOST:         str(),
    REDIS_PORT:         port(),
    UTC:                num(),
    SECRET:             str(),
    YEAR:               num()
})

module.exports = env