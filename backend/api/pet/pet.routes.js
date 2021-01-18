const express = require('express')
const {getPet, getPets} = require('./pet.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getPets)
router.get('/:id', getPet)

module.exports = router