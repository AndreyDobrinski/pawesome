const petService = require('./pet.service')
const logger = require('../../services/logger.service')

async function getPet(req, res) {
    try {
        const pet = await petService.getById(req.params.id)
        res.send(pet)
    } catch (err) {
        logger.error('pet.controller : Failed to get a pet', err)
        res.status(500).send({ err: 'Failed to get a pet' })
    }
}

async function getPets(req, res) {
    try {
        const { kind, age } = req.query
        console.log('Request query with filter...' ,req.query)
        console.log('controller: from request --- kind --- ', kind)
        console.log('controller: from request --- age --- ', age)
        const filterBy = req.query

        console.log('petController, filterBy...', filterBy)
        const pets = await petService.query(filterBy)
        res.send(pets)
    } catch (err) {
        logger.error('pet.controller : Failed to get pets', err)
        res.status(500).send({ err: 'Failed to get pets' })
    }
}

async function updatePet(req, res) {
    try {
        const pet = req.body
        const savedPet = await petService.update(pet)
        res.send(savedPet)
    } catch (err) {
        logger.error('Failed to update pet', err)
        res.status(500).send({ err: 'Failed to update a pet' })
    }
}

module.exports = {
    getPet,
    getPets,
    updatePet
}