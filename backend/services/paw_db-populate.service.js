const dbJSON = require('../pawdb.json')
const dbService = require('./db.service')

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

// const dbUserService = {
//     async add(user, isTemp = true) {
//         const collection = await dbService.getCollection(isTemp ? 'temp_user' : 'user')
//         await collection.insertOne(user)
//         return user
//     }
// }

const dbUserService = {
    async add(user) {
        const collection = await dbService.getCollection('user')
        await collection.insertOne(user)
        return user
    }
}

async function go() {
    // const users = assignPets2Users()
    // console.log('users ', users[0])
    // const userMap = await saveUsers2(users)
    const userMap = await saveUsers()
    const petMap = await savePets(userMap)
    // await saveUsers(petMap)
    console.log('userMap', userMap)
    console.log('petMap', petMap)
    // const saved = await saveOrders(userMap, petMap)
    // console.log('Saved', saved[0])
}

function assignPets2Users() {

    const pets = dbJSON.pet
    const users = dbJSON.user

    users.forEach(user => {
        user.pets = pets.filter(pet => pet.host._id === user._id).map(pet => {
            const miniPet = {
                petId: pet._id,
                name: pet.name,
                imgUrls: pet.imgUrls
                // hostId: savedPet.host._id
            }

            return miniPet
        })
    })

    return users
}

// async function saveUsers(petMap = null) {
async function saveUsers() {
    console.log('Importing ', dbJSON.user.length, 'Users')
    const localUserIds = []
    // const tempDb = (petMap == null)
    const prms = dbJSON.user.map((user) => {
        const localUserId = user._id
        localUserIds.push(localUserId)
        delete user._id

        // if (petMap) {
        //     const pets = []
        //     for (var key in petMap) {
        //         const pet = petMap[key]
        //         if (pet.hostId === localUserId) {
        //             pets.push(pet)
        //         }
        //     }
        //     user.pets = pets
        // }

        // if (petMap && user.pets) {
        //     console.log('Updating users with pets....')
        //     const pets = []
        //     for (let i = 0; i < user.pets.length; i++) {
        //         pets.push(petMap[user.pets[i]._id])
        //     }
        //     user.pets = pets
        // }

        return dbUserService.add(user)

        // return dbUserService.add(user, tempDb)
    })

    return Promise.all(prms)
        .then((users) => {
            const userMap = users.reduce((accUserMap, savedUser, idx) => {
                const miniUser = {
                    _id: savedUser._id.toString(),
                    fullname: savedUser.fullname,
                    imgUrl: savedUser.imgUrl,
                    phone: savedUser.contactInfo.phone,
                    email: savedUser.contactInfo.email,
                    loc: { ...savedUser.loc }
                }
                accUserMap[localUserIds[idx]] = miniUser
                return accUserMap
            }, {})
            return userMap
        })
}

async function saveUsers2(users) {
    console.log('Importing ', dbJSON.user.length, 'Users')
    const localUserIds = []
    
    const prms = users.map((user) => {
        const localUserId = user._id
        localUserIds.push(localUserId)
        delete user._id

        return dbUserService.add(user, tempDb)
    })

    return Promise.all(prms)
        .then((users) => {
            const userMap = users.reduce((accUserMap, savedUser, idx) => {
                const miniUser = {
                    _id: savedUser._id.toString(),
                    fullname: savedUser.fullname,
                    imgUrl: savedUser.imgUrl,
                    phone: savedUser.phone,
                    email: savedUser.email,
                    loc: { ...savedUser.loc }
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
                    imgUrls: savedPet.imgUrls,
                    hostId: savedPet.host._id
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
        const pet = { ...petMap[order.pet._id] }
        order.pet = pet
        return orderService.add(order)
    })
    return Promise.all(prms)
}

module.exports = {
    go
}