const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query() {
    try {
        const criteria = _buildCriteria()
        console.log('order.service criteria:', criteria)
        const collection = await dbService.getCollection('order')
        const orders = await collection.find(criteria).toArray()
        // console.log('order.service orders:', orders)
        // var orders = await collection.aggregate([
        //     {
        //         $match: filterBy
        //     },
        //     {
        //         $lookup:
        //         {
        //             from: 'user',
        //             localField: 'byUserId',
        //             foreignField: '_id',
        //             as: 'byUser'
        //         }
        //     },
        //     {
        //         $unwind: '$byUser'
        //     },
        //     {
        //         $lookup:
        //         {
        //             from: 'user',
        //             localField: 'aboutUserId',
        //             foreignField: '_id',
        //             as: 'aboutUser'
        //         }
        //     },
        //     {
        //         $unwind: '$aboutUser'
        //     }
        // ]).toArray()
        // orders = orders.map(order => {
        //     order.byUser = { _id: order.byUser._id, fullname: order.byUser.fullname }
        //     order.aboutUser = { _id: order.aboutUser._id, fullname: order.aboutUser.fullname }
        //     delete order.byUserId
        //     delete order.aboutUserId
        //     return order
        // })
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }

}

async function update(order) {
    try {
        // peek only updatable fields!
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

function _buildCriteria() {
    var criteria = {}
    // console.log('req.session.user._id', req.session.user._id)
    // criteria.ownerId  = ObjectId(req.session.user._id)
    return criteria
}

module.exports = {
    query,
    add,
    update
}


