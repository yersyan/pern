const Router = require("express")
const router = new Router()
const elementController = require('../controllers/elementController')

router.post('/', elementController.create)
router.get('/', elementController.getAll)
router.get('/:id', elementController.getOne)

module.exports = router