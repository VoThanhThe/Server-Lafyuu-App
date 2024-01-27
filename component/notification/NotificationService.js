const notificationModel = require('./NotificationModel');

const getAllNotification = async (user_id) => {
    try {
        return await notificationModel.find({user_id: user_id, type: { $ne: "delete"}}).sort({timestamp: -1});
    } catch (error) {
        console.log('get all notification error: ', error);
    }
    return [];
}

//Delete notification
const deleteNotificationByID = async (id) => {
    try {
        let notification = await notificationModel.findById(id);
        if (notification) {
            notification.type = "delete";
            await notification.save();
            return true;
        }
    } catch (error) {
        console.log('Delete notification by ID error', error);
        throw error;
    }
}

//Them moi danh mục
const addNotificationOrder = async (userId, orderId) => {
    try {
        // Tạo thông báo mới
        const newNotification = {
            type: "order_success",
            title: "Order Successful",
            message: "Congratulations! Your purchase was successful.",
            user_id: userId,
            metadata: {
                order_id: orderId
            }
        };
        return await notificationModel.create(newNotification);
    } catch (error) {
        console.log('Add new notification error', error);

    }
    return false;
}

module.exports = {getAllNotification, addNotificationOrder, deleteNotificationByID};