const {
    User
} = require('../models/user')
const user = new User()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('../utils/env')

user.sync()


exports.register = async (req, res, next) => {
    try {
        const { email, pass } = req.body

        const candidate = await user.findOne(email)

        if (candidate) {
            return res.status(400).json({ message: 'User already exist!'})
        }

        let hashedPass = await bcrypt.hash(pass, 12)

        await user.save({
            email: email,
            pass: hashedPass
        })

        res.status(201).json({ message: 'User created!'})
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, pass } = req.body

        const candidate = await user.findOne(email)

        if (!candidate) {
            return res.status(400).json({ message : 'User not found!'})
        }

        let isMatch = await bcrypt.compare(pass, candidate.pass)

        if (!isMatch) {
            return res.status(400).json({ message : 'Wrong password!'})
        }

        let token = jwt.sign(
            { userId: candidate.id },
            env.SECRET,
            { expiresIn: '1h' }
        )

        res.json({ token, userId: candidate.id })
    } catch (err) {
        next(err)
    }
}