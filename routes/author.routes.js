const { Router } = require('express')
const router = Router()
const author_controller = require('../controllers/author.controller')
const auth = require('../middleware/auth.middleware')

router.post('/add_csv', auth, author_controller.add_csv)

router.post('/find_one', auth, author_controller.find_one)

router.post('/update', auth, author_controller.update)

router.get('/list', auth, author_controller.list)

module.exports = router