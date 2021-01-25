import { httpService } from './httpService'

export const orderService = {
    query,
    saveOrder,
    isOrderDone,
    updateOrder
}

function query() {
    try {
        return httpService.get(`order`)
    } catch (err) {
        console.log('FrontError: getting orders', err)
        throw err
    }
}

async function isOrderDone(petId, userId) {
    var orders = await this.query()
    var res = orders.filter(order => {
        return order.pet._id === petId && order.byUser._id === userId
    })
    if (res.length > 0) return true
    else return false
}

async function saveOrder(pet, message) {
    try {
        var newOrder = {
            message: message,
            pet: {
                name: pet.name,
                _id: pet._id,
                imgUrls: pet.imgUrls
            },
            ownerId: pet.host._id,
            byUser: {
                _id: '',
                fullname: ''
            }
        }
        return httpService.post(`order`, newOrder)
    } catch (err) {
        console.log('FrontError: saving order', err)
        throw err
    }
}

async function updateOrder(newOrder) {
    try {
        return httpService.put(`order/:${newOrder._id}`, newOrder)
    } catch (err) {
        console.log('FrontError: updating order', err)
        throw err
    }
}