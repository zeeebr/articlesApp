const parser = require('../parser')

exports.parser = async (req, res, next) => {
    try {
        //console.log(req.body[0])
        await parser(req.body)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
}