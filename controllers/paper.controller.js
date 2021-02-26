const { parser, getOurAuthorsId } = require('../parser')
const {
    Paper
} = require('../models/paper')
const paper = new Paper()
let exportPapers = require('../exportPapers')


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

exports.find_one = async (req, res, next) => {
    try {
        let data = await paper.findOne(req.body.eid)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

exports.update = async (req, res, next) => {
    try {
        await paper.update(req.body)
        res.status(200).json({ message: `Paper with eid ${req.body.eid} updated!`})
    } catch (err) {
        next(err)
    }
}

exports.update_our_authors = async (req, res, next) => {
    try {
        let newId = await getOurAuthorsId(req.body.ourAuthors)
        
        res.status(200).json({ message: `OurAuthorsId for eid ${req.body.eid} updated!`, newId: newId })
    } catch (err) {
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        await paper.delete(req.body.eid)
        
        res.status(200).json({ message: `Paper with eid ${req.body.eid} deleted!`})
    } catch (err) {
        next(err)
    }
}

exports.export = async (req, res, next) => {
    try {
        let data = await exportPapers()

        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}