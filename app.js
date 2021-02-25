const express = require('express')
const env = require('./utils/env')
const app = express()
require('./count')

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

app.listen(env.PORT, () => console.log(`App listening on port ${env.PORT}`))
