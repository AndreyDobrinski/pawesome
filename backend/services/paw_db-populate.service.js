const dbJSON = require('../db.json')
const dbService = require('./db.service')
const userService = require('../api/user/user.service')

const petService = {
    async add(pet) {
        const collection = await dbService.getCollection('pet')
        await collection.insertOne(pet)
        return pet
    }
}
const orderService = {
    async add(order) {
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order)
        return order
    }
}

const dbUserService = {
    async add(user, isTemp = true) {
        const collection = await dbService.getCollection(isTemp ? 'temp_user' : 'user')
        await collection.insertOne(user)
        return user
    }
}

// userMap: localId  ===> miniUserFromDB
// userMap: 'u101'  ===> {_id: 'xx12jhjkka22', fullName: 'Mashu', imgUrl: ''}

async function go() {
    const userMap = await saveUsers()
    const petMap = await savePets(userMap)
    await saveUsers(petMap)
    console.log('userMap', userMap)
    console.log('petMap', petMap)
    const saved = await saveOrders(userMap, petMap)
    console.log('Saved', saved[0])
}

async function saveUsers(petMap=null) {
    console.log('Importing ', dbJSON.user.length, 'Users')
    const localUserIds = []
    const tempDb = (petMap==null)
    const prms = dbJSON.user.map((user) => {
        const localUserId = user._id
        localUserIds.push(localUserId)
        delete user._id

        if (petMap && user.pets) {
            console.log('Updating users with pets....')
            const pets = []
            for ( let i = 0; i < user.pets.length; i++ ) {
                pets.push(petMap[user.pets[i]._id])
            }
            user.pets = pets
        }
        
        return dbUserService.add(user, tempDb)
    })

    return Promise.all(prms)
        .then((users) => {
            const userMap = users.reduce((accUserMap, savedUser, idx) => {
                const miniUser = {
                    _id: savedUser._id.toString(),
                    fullname: savedUser.fullname,
                    imgUrl: savedUser.imgUrl
                }
                accUserMap[localUserIds[idx]] = miniUser
                return accUserMap
            }, {})
            return userMap
        })
}

async function savePets(userMap) {
    console.log('Importing ', dbJSON.pet.length, 'Pets')
    const localPetIds = []
    const prms = dbJSON.pet.map((pet) => {
        const localPetId = pet._id
        localPetIds.push(localPetId)
        delete pet._id
        pet.host = userMap[pet.host._id]
        return petService.add(pet)
    })

    return Promise.all(prms)
        .then((pets) => {
            const petMap = pets.reduce((accPetMap, savedPet, idx) => {
                const miniPet = {
                    _id: savedPet._id.toString(),
                    name: savedPet.name,
                    imgUrls: savedPet.imgUrls
                }
                accPetMap[localPetIds[idx]] = miniPet
                return accPetMap
            }, {})
            return petMap
        })
}


function saveOrders(userMap, petMap) {
    console.log('Importing ', dbJSON.order.length, 'Orders!')
    const prms = dbJSON.order.map(order => {
        delete order._id
        order.byUser = userMap[order.byUser._id]
        const pet = {...petMap[order.pet._id]}
        order.pet = pet
        return orderService.add(order)
    })
    return Promise.all(prms)
}

module.exports = {
    go
}