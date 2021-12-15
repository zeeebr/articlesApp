const {
    Paper
} = require('./models/paper')
const paper = new Paper()
const env = require('./utils/env.js')
const asyncRedis = require('async-redis')
const client = asyncRedis.createClient({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT
})
const cron = require('node-cron')

client.on("error", function (err) {
    console.log("Error " + err);
})

paper.sync()

cron.schedule('* * * * * *', main)

async function main() {
    let year1 = (env.YEAR).toString()
    let year2 = (year1 - 1).toString()
    let year3 = (year1 - 2).toString()
    let year4 = (year1 - 3).toString()
    let year5 = (year1 - 4).toString()
    let year6 = (year1 - 5).toString()

    let count1s = await paper.count(year1, 'scopus')
    let count2s = await paper.count(year2, 'scopus')
    let count3s = await paper.count(year3, 'scopus')
    let count4s = await paper.count(year4, 'scopus')
    let count5s = await paper.count(year5, 'scopus')
    let count6s = await paper.count(year6, 'scopus')

    let count1sP = await paper.count(year1, 'scopus', true)
    let count2sP = await paper.count(year2, 'scopus', true)
    let count3sP = await paper.count(year3, 'scopus', true)
    let count4sP = await paper.count(year4, 'scopus', true)
    let count5sP = await paper.count(year5, 'scopus', true)
    let count6sP = await paper.count(year6, 'scopus', true)

    let count1w= await paper.count(year1, 'wos')
    let count2w= await paper.count(year2, 'wos')
    let count3w= await paper.count(year3, 'wos')
    let count4w= await paper.count(year4, 'wos')
    let count5w= await paper.count(year5, 'wos')
    let count6w= await paper.count(year6, 'wos')

    let count1wP = await paper.count(year1, 'wos', true)
    let count2wP = await paper.count(year2, 'wos', true)
    let count3wP = await paper.count(year3, 'wos', true)
    let count4wP = await paper.count(year4, 'wos', true)
    let count5wP = await paper.count(year5, 'wos', true)
    let count6wP = await paper.count(year6, 'wos', true)

    let countTable = {
        year1: env.YEAR,
        scopus: {
            1: count1s,
            2: count2s,
            3: count3s,
            4: count4s,
            5: count5s,
            6: count6s
        },
        scopus_new: {
            1: count1sP,
            2: count2sP,
            3: count3sP,
            4: count4sP,
            5: count5sP,
            6: count6sP
        },
        wos: {
            1: count1w,
            2: count2w,
            3: count3w,
            4: count4w,
            5: count5w,
            6: count6w
        },
        wos_new: {
            1: count1wP,
            2: count2wP,
            3: count3wP,
            4: count4wP,
            5: count5wP,
            6: count6wP
        }
    }
    
    await client.set('counter', JSON.stringify(countTable))
}