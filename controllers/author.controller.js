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

exports.find_one = async (req, res, next) => {
    try {
        let data = await author.findOne(req.body[0])
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

exports.list = async (req, res, next) => {
    try {
        let arr = []
        let data = await author.list()
        
        for (let i in data) {
            arr.push(data[i].alias)
        }

        res.json(arr)
    } catch (err) {
        next(err)
    }
}