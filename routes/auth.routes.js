const { Router } = require('express')
const router = Router()
const auth_controller = require('../controllers/auth.controller')

router.post('/register', auth_controller.register)

router.post('/login', auth_controller.login)

module.exports = router