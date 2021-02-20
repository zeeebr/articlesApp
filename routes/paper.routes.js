const { Router } = require('express')
const router = Router()
const paper_controller = require('../controllers/paper.controller')
const auth = require('../middleware/auth.middleware')

router.post('/parser', auth, paper_controller.parser)

module.exports = router