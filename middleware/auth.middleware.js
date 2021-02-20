const jwt = require('jsonwebtoken')
const env = require('../utils/env')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        let token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'No authorization!' })
        }

        let decoded = jwt.verify(token, env.SECRET)
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).json({ message: 'No authorization!' })
    }
}