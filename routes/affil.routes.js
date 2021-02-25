const { Router } = require('express')
const router = Router()
const affil_controller = require('../controllers/affil.controller')
const auth = require('../middleware/auth.middleware')

router.post('/add', auth, affil_controller.add)

router.delete('/delete', auth, affil_controller.delete)

router.post('/list', auth, affil_controller.list)

module.exports = router