const env = require('../utils/env.js')
const asyncRedis = require('async-redis')
const client = asyncRedis.createClient({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT
})

client.on("error", function (err) {
    console.log("Error " + err);
})

exports.count = async (req, res, next) => {
    try {
        let data = await client.get('counter')
        res.send(JSON.parse(data))
    } catch (err) {
        next(err)
    }
}