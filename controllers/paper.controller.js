const parser = require('../parser')
const {
    Paper
} = require('../models/paper')
const paper = new Paper()


exports.write_new = async (req, res, next) => {
    try {
        await paper.writeNew()
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
}

exports.reset_new = async (req, res, next) => {
    try {
        await paper.resetNew()
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
}

exports.parser = async (req, res, next) => {
    try {
        //console.log(req.body[0])
        await parser(req.body)
        res.status(200).json({ message: 'Done!' })
    } catch (err) {
        next(err)
    }
}