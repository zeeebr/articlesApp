const { Router } = require('express')
const router = Router()
const paper_controller = require('../controllers/paper.controller')
const auth = require('../middleware/auth.middleware')

router.get('/write_new', auth, paper_controller.write_new)
router.get('/reset_new', auth, paper_controller.reset_new)
router.post('/parser', auth, paper_controller.parser)

module.exports = router