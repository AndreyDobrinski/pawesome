const express = require('express')
const {getPet, getPets, updatePet} = require('./pet.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getPets)
router.get('/:id', getPet)
router.put('/:id', updatePet)

module.exports = router