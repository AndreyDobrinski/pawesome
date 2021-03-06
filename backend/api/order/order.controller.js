const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const orderService = require('./order.service')

async function getOrders(req, res) {
    try {
        const orders = await orderService.query(req.session.user._id)
        res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function updateOrder(req, res) {
    try {
        var order = req.body
        order = await orderService.update(order)
        res.send(order)
    } catch (err) {
        logger.error('Failed to delete order', err)
        res.status(500).send({ err: 'Failed to delete order' })
    }
}


async function addOrder(req, res) {
    try {
        var order = req.body
        console.log('req.session.user:', req.session.user)
        order.byUser._id = req.session.user._id
        order.byUser.fullname = req.session.user.fullname
        order = await orderService.add(order)
        res.send(order)

    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}

module.exports = {
    getOrders,
    updateOrder,
    addOrder
}