const {Router} = require('express')

const users = require('../controllers/users')

const router = Router()

router.use('/users',users)

module.exports = router