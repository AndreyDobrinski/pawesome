const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const userService = require('../user/user.service')

async function query(userId) {
    try {
        const collection = await dbService.getCollection('order')
        const user = await userService.getById(userId)
        if (user?.isHost) {
            return await collection.find({ ownerId: userId }).toArray()
        } else {
            return await collection.find({ "byUser._id": userId }).toArray()
        }
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function update(order) {
    try {
        const orderToSave = {
            ...order,
            _id: ObjectId(order._id)
        }
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ '_id': orderToSave._id }, { $set: orderToSave })
        return orderToSave;
    } catch (err) {
        logger.error(`cannot update order ${order._id}`, err)
        throw err
    }
}

async function add(order) {
    try {
        const orderToAdd = {
            ...order,
            status: 'requested',
            createdAt: new Date().toLocaleString()
        }
        const collection = await dbService.getCollection('order')
        await collection.insertOne(orderToAdd)
        return orderToAdd;
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}


module.exports = {
    query,
    add,
    update
}


