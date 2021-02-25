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
            name: {
                type: Sequelize.STRING,
                unique: true
            },
            alias: Sequelize.STRING,
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
    async findOneByName(name) {
        try {
            let data = await this.model.findOne({
                where: {
                    name: name
                },
                raw: true
            })
            
            return data
        } catch (err) {
            console.log(err.message)
        }
    }
    async findOneByAlias(alias) {
        try {
            let data = await this.model.findOne({
                where: {
                    alias: alias
                },
                raw: true
            })
            
            return data
        } catch (err) {
            console.log(err.message)
        }
    }
    async findOneById(id) {
        try {
            let data = await this.model.findOne({
                where: {
                    id: id
                },
                raw: true
            })
            
            return data
        } catch (err) {
            console.log(err.message)
        }
    }
    async findAll() {
        try {
            let existAuthors = await this.model.findAll({
                raw: true,
            })

            return existAuthors
        } catch (err) {
            console.log(err.message)
        }
    }
    async update(data) {
        try {
            await this.model.update(data, {
                where: {
                    id: data.id
                }
            })
            
            console.log('Author updated!')
        } catch (err) {
            console.log(err.message)
        }
    }
    async add(data) {
        try {
            await this.model.create(data)
            
            console.log('Author added!')
        } catch (err) {
            console.log(err.message)
        }
    }
    async delete(id) {
        try {
            await this.model.destroy({
                where: {
                    id: id
                }
            })
            
            console.log('Author deleted!')
        } catch (err) {
            console.log(err.message)
        }
    }
}

exports.Author = Author