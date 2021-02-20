const Sequelize = require('sequelize')
const env = require('../utils/env')

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: 'postgres',
    logging: false
})

class Author {
    constructor() {
        this.model = sequelize.define('Author', {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            name: Sequelize.STRING,
            alias: {
                type: Sequelize.STRING,
                unique: true
            },
            inst: Sequelize.STRING,
            cathedra: Sequelize.STRING,
            frezee: Sequelize.BOOLEAN
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
    async list() {
        try {
            let existAuthors = await this.model.findAll({
                attributes: ['name', 'id'],
                raw: true,
            })

            return existAuthors
        } catch (err) {
            console.log(err.message)
        }
    }
    async saveCsv(data) {
        try {
            await this.model.bulkCreate(data, {
                fields: ["name", "alias", "inst", "cathedra", "frezee"],
                updateOnDuplicate: ["name", "alias", "inst", "cathedra"]
            })
            console.log('Authors CSV file is written to the database!')
        } catch (err) {
            console.log(err.message)
        }
    }
    async findOne(author) {
        try {
            let data = await this.model.findOne({
                where: {
                    alias: author
                },
                raw: true
            })
            
            return data
        } catch (err) {
            console.log(err.message)
        }
    }
}

exports.Author = Author