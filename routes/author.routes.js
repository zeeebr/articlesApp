const { Router } = require('express')
const router = Router()
const author_controller = require('../controllers/author.controller')
const auth = require('../middleware/auth.middleware')

router.post('/add_csv', auth, author_controller.add_csv)

router.post('/find_one', auth, author_controller.find_one)

module.exports = router