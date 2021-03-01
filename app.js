const https = require('https')
const http = require('http')
const express = require('express')
const env = require('./utils/env')
const app = express()
const fs = require('fs')
require('./count')

app.use(express.static('public'))

app.use(express.json({ extended: true, limit: '50mb' }))

app.use('/', require('./routes/index.routes'))
app.use('/affil', require('./routes/affil.routes'))
app.use('/auth', require('./routes/auth.routes'))
app.use('/author', require('./routes/author.routes'))
app.use('/paper', require('./routes/paper.routes'))

app.use((err, req, res, next) => {
    console.log(err)
            
    res.status(err.status)
    res.json({
        message: err.message,
        error: err
    })
})

if (env.HTTPS == true) {
    https.createServer({
        key: fs.readFileSync('./sslcert/privkey.pem'),
        cert: fs.readFileSync('./sslcert/fullchain.pem')
    }, app).listen(env.HTTPS_PORT,  () => {
        console.log(`App listening on port ${env.PORT} (https)`)
    })
} else {
    http.createServer(app).listen(env.PORT,  () => {
        console.log(`App listening on port ${env.PORT} (http)`)
    })
}