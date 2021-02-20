const Sequelize = require('sequelize')
const env = require('../utils/env')

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: 'postgres',
    logging: false
})

class User {
    constructor() {
        this.model = sequelize.define('User', {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            email: Sequelize.STRING,
            pass: Sequelize.STRING,
            role: Sequelize.STRING
        }, {
            freezeTableName: true
        })
    }
    sync() {
        try {
            return this.model.sync()
        } catch (err) {
            console.log(err.message)
        }
    }
    async save(data) {
        try {
            await this.model.create(data)
        } catch (err) {
            console.log(err.message)
        }
    }
    async findOne(email) {
        try {
            let data = await this.model.findOne({
                where: {
                    email: email
                },
                raw: true
            })
            
            return data
        } catch (err) {
            console.log(err.message)
        }
    }
}

exports.User = User