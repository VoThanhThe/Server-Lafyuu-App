const notificationService = require('./NotificationService');

const getAllNotification = async (user_id) =>{
    try {
        return await notificationService.getAllNotification(user_id);
    } catch (error) {
        throw error;
    }
}

const deleteNotificationByID = async (id) => {
    try {
        return await notificationService.deleteNotificationByID(id);
    } catch (error) {
        throw error;
    }
}

const addNotificationOrder = async (userId, orderId) => {
    try {
        await notificationService.addNotificationOrder(userId, orderId);
    } catch (error) {
        console.log('get notification by id error',error);
    }
}

module.exports ={getAllNotification, addNotificationOrder, deleteNotificationByID };