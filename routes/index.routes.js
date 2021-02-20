const { Router } = require('express')
const router = Router()
const index_controller = require('../controllers/index.controller')
const auth = require('../middleware/auth.middleware')

router.get('/count', auth, index_controller.count)

module.exports = router