
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

const COLLECTION = 'pet'

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {

    const criteria = _buildCriteria(filterBy)

    const { sortBy } = filterBy
    let sortCriteriaKey = sortBy
    let asc = 1
    if (sortBy === 'likes') asc = -1
    if (sortBy === 'orgname') sortCriteriaKey = 'host.fullname'

    try {
        const collection = await dbService.getCollection(COLLECTION)
        var pets = await collection.find(criteria).sort({ [sortCriteriaKey]: asc }).toArray()

        // console.log('PetService : Pets by criteria...', pets)
        return pets
    } catch (err) {
        logger.error('no pets were found', err)
        throw err
    }
}

async function getById(petId) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        const user = await collection.findOne({ '_id': ObjectId(petId) })

        return user
    } catch (err) {
        logger.error(`Not found the pet object with id = ${petId}`, err)
        throw err
    }
}

async function remove(petId) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        await collection.deleteOne({ '_id': ObjectId(petId) })
    } catch (err) {
        logger.error(`cannot remove pet ${petId}`, err)
        throw err
    }
}

async function update(pet) {
    try {

        const petToSave = { ...pet, _id: ObjectId(pet._id) }
        const collection = await dbService.getCollection(COLLECTION)
        await collection.updateOne({ '_id': petToSave._id }, { $set: petToSave })
        return petToSave;
    } catch (err) {
        logger.error(`cannot update user ${pet._id}`, err)
        throw err
    }
}

async function add(pet) {
    try {
        const petToAdd = { ...pet }

        const collection = await dbService.getCollection(COLLECTION)
        await collection.insertOne(petToAdd)
        return petToAdd
    } catch (err) {
        logger.error(`cannot insert a new pet ${pet}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {

    const criteria = {}

    const filterCriterias = []
    for (var key in filterBy) {
        if (key === 'sortBy') continue
        if (key === 'name') {
            const nameCriteria = { $regex: `${filterBy.name}`, $options: 'i' }
            filterCriterias.push({ 'name': nameCriteria })
            continue
        }
        if (key === 'address') {
            // filterCriterias.push({ 'host.loc.address': filterBy[key] })
            filterCriterias.push({ 'address': filterBy[key] })
            continue
        }
        filterCriterias.push({ [key]: filterBy[key] })
    }

    if (filterCriterias.length) criteria.$and = filterCriterias

    return criteria
}
