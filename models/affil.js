const Sequelize = require('sequelize')
const env = require('../utils/env')

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: 'postgres',
    logging: false
})

class Affil {
    constructor() {
        this.model = sequelize.define('Affil', {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            base: Sequelize.STRING,
            affil: Sequelize.ARRAY(Sequelize.STRING)
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
    async add(data) {
        try {
            await this.model.create(data)
            console.log(`New affil is written to the database!`)
        } catch (err) {
            console.log(err.message)
        }
    }
    async list(base) {
        try {
            let existAffils = await this.model.findAll({
                attributes: ['affil'],
                where: {
                    base: base
                },
                raw: true,
            })

            let data = []

            for (let i in existAffils) data.push(existAffils[i].affil)

            return data
        } catch (err) {
            console.log(err.message)
        }
    }
}

exports.Affil = Affil