const { Router } = require('express')
const router = Router()
const paper_controller = require('../controllers/paper.controller')
const auth = require('../middleware/auth.middleware')

router.get('/write_new', auth, paper_controller.write_new)

router.get('/reset_new', auth, paper_controller.reset_new)

router.post('/parser', auth, paper_controller.parser)

router.post('/find_one', auth, paper_controller.find_one)

router.post('/update', auth, paper_controller.update)

router.delete('/delete', auth, paper_controller.delete)

router.get('/export', auth, paper_controller.export)

module.exports = router