const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const orderService = require('./order.service')

async function getOrders(req, res) {
    try {
        const orders = await orderService.query(req.query)
        console.log('order.controller orders', orders)
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

        // await orderService.remove(req.params.id)
        // res.send({ msg: 'Deleted successfully' })
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
        // order.byUser = req.session.user
        // order.aboutUser = await userService.getById(order.aboutUserId)
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