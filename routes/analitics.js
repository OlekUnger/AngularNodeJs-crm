const express = require('express')
const controller = require('../controllers/analitics')
const router = express.Router()

router.get('/login', controller.overview)

router.get('/register', controller.analitics)

module.exports = router