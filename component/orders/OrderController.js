const orderService = require('./OrderService');

const getAllOrders = async (user_id) => {
    try {
        return await orderService.getAllOrders(user_id);
    } catch (error) {
        throw error;
    }
}

const deleteOrderByID = async (id) => {
    try {
        return await orderService.deleteOrderByID(id);
    } catch (error) {
        throw error;
    }
}

const updateOrder = async (id, status) => {
    try {
        return await orderService.updateOrder(id, status);
    } catch (error) {
        console.log('Update order error',error);
    }
}

const getOrderByID = async (id) => {
    try {
        return await orderService.getOrderByID(id);
    } catch (error) {
        console.log('get order by id error',error);
    }
}


const addNewOrder = async (total_price, shipping_info, items, user_id) => {
    try {
       return await orderService.addNewOrder(total_price, shipping_info, items, user_id);
    } catch (error) {
        console.log('add new order error',error);
    }
}

module.exports = {getAllOrders, deleteOrderByID, addNewOrder, 
    updateOrder, getOrderByID};