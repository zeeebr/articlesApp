const { Router } = require('express')
const router = Router()
const author_controller = require('../controllers/author.controller')
const auth = require('../middleware/auth.middleware')

router.post('/add_csv', auth, author_controller.add_csv)

router.post('/find_one_by_name', auth, author_controller.find_one_by_name)

router.post('/find_one_by_alias', auth, author_controller.find_one_by_alias)

router.post('/update', auth, author_controller.update)

router.get('/list_names', auth, author_controller.list_names)

router.get('/list_aliases', auth, author_controller.list_aliases)

router.post('/add', auth, author_controller.add)

router.post('/delete', auth, author_controller.delete)

module.exports = router