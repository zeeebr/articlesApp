const {
    Affil
} = require('../models/affil')
const affil = new Affil()

exports.add = async (req, res, next) => {
    try {
        await affil.add(req.body)
        let data = await affil.list(req.body.base)
        res.send(JSON.stringify(data))
    } catch (err) {
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        await affil.delete(req.body.affil)
        let data = await affil.list(req.body.base)
        res.send(JSON.stringify(data))
    } catch (err) {
        next(err)
    }
}

exports.list = async (req, res, next) => {
    try {
        let data = await affil.list(req.body.base)
        res.send(JSON.stringify(data))
    } catch (err) {
        next(err)
    }
}