const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

//localhost:5000/api/login
router.post('/login', controller.login)
//localhost:5000/api/register
router.post('/register', controller.register)

module.exports = router