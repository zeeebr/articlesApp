const {
    Author
} = require('../models/author')
const author = new Author()
const translit = require('../utils/translit')

author.sync()

exports.add_csv = async (req, res, next) => {
    try {
        let authors = req.body

        let data = []

        for(let i in authors) {
            //console.log(authors[i])
            data.push({
                name: translit(authors[i]["Авторы"]),
                alias: authors[i]["Авторы"],
                inst: authors[i]["Структурное подразделение"],
                cathedra: authors[i]["Кафедра"],
                frezee: false
            })
        }
        await author.saveCsv(data)
        res.status(200).json({ message: 'Authors CSV file is written to the database!'})
    } catch (err) {
        next(err)
    }
}

exports.find_one_by_name = async (req, res, next) => {
    try {
        let data = await author.findOneByName(req.body.name)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

exports.find_one_by_alias = async (req, res, next) => {
    try {
        let data = await author.findOneByAlias(req.body.alias)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

exports.update = async (req, res, next) => {
    try {
        await author.update(req.body)
        res.status(200).json({ message: `Author (${req.body.alias}) updated!` })
    } catch (err) {
        next(err)
    }
}

exports.list_names = async (req, res, next) => {
    try {
        let arr = []
        let data = await author.findAll()
        
        for (let i in data) {
            arr.push(data[i].name)
        }

        arr.sort()

        res.json(arr)
    } catch (err) {
        next(err)
    }
}

exports.list_aliases = async (req, res, next) => {
    try {
        let arr = []
        let data = await author.findAll()
        
        for (let i in data) {
            arr.push(data[i].alias)
        }

        arr.sort()

        res.json(arr)
    } catch (err) {
        next(err)
    }
}

exports.add = async (req, res, next) => {
    try {
        await author.add(req.body)
        res.status(200).json({ message: `Author (${req.body.name}) added!` })
    } catch (err) {
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        await author.delete(req.body.id)
        res.status(200).json({ message: `Author (${req.body.name}) deleted!` })
    } catch (err) {
        next(err)
    }
}